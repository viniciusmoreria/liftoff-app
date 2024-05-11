import { FirebaseAuth } from '@libs/firebase/auth';
import { Logger } from '@libs/logger';
import { Sentry } from '@libs/sentry';
import { Fallback } from '@modules/components';
import { useNotificationPermission } from '@modules/notifications/hooks/useNotificationPermission';
import { AppProviders } from '@modules/providers/app-providers';
import { customFontsToLoad } from '@theme/typography';
import { useFonts } from 'expo-font';
import { ErrorBoundaryProps, Slot, SplashScreen, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import '../libs/i18n/translation';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.EXPO_PUBLIC_STAGE,
  tracesSampleRate: 1.0,
  debug: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <Fallback error={props.error} resetErrorBoundary={props.retry} />;
}

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const ref = useNavigationContainerRef();

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
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    if (areFontsLoaded) {
      runAsync();
    }
  }, [areFontsLoaded, runAsync]);

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
