import { analyticsService } from '@libs/amplitude';
import { useAnalytics } from '@libs/firebase/analytics';
import { FirebaseAuth } from '@libs/firebase/auth';
import { Logger } from '@libs/logger';
import { Sentry } from '@libs/sentry';
import { Fallback } from '@modules/components';
import { useNotificationPermission } from '@modules/notifications/hooks/useNotificationPermission';
import { AppProviders } from '@modules/providers/app-providers';
import { customFontsToLoad } from '@theme/typography';
import { useFonts } from 'expo-font';
import {
  ErrorBoundaryProps,
  Slot,
  SplashScreen,
  useGlobalSearchParams,
  useNavigationContainerRef,
  usePathname,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import '../libs/i18n/translation';

const reactNavigationIntegration =  Sentry.reactNavigationIntegration();

analyticsService.init(process.env.EXPO_PUBLIC_AMPLITUDE_KEY);

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.EXPO_PUBLIC_STAGE,
  tracesSampleRate: 1.0,
  debug: false,
  enableAppStartTracking: true,
  enableNativeFramesTracking: true,
  enableStallTracking: true,
  enableUserInteractionTracing: true,
  integrations: [
    reactNavigationIntegration,
  ],
});

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <Fallback error={props.error} resetErrorBoundary={props.retry} />;
}

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const ref = useNavigationContainerRef();
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  const { logEvent } = useAnalytics();
  const { requestPermission } = useNotificationPermission();

  const [areFontsLoaded] = useFonts(customFontsToLoad);
  const [appIsReady, setAppIsReady] = useState(false);

  const runAsync = useCallback(async () => {
    try {
      await FirebaseAuth.signInAnonymously();
      requestPermission();
    } catch (error) {
      Logger.error({
        domain: 'Startup',
        error,
        name: 'FirebaseSignInError',
        severity: 'error',
      });
    } finally {
      await SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [requestPermission]);

  useEffect(() => {
    if (ref) {
      reactNavigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    if (areFontsLoaded) {
      runAsync();
    }
  }, [areFontsLoaded, runAsync]);

  useEffect(() => {
    logEvent(pathname, params);
  }, [pathname, params]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AppProviders>
      <StatusBar style="light" animated />
      <Slot />
    </AppProviders>
  );
}

export default Sentry.wrap(RootLayout);
