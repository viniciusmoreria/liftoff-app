import { ReactNode, useRef } from 'react';

import { analyticsService } from '@libs/amplitude/analytics';
import { Sentry } from '@libs/sentry';
import analytics from '@react-native-firebase/analytics';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();

analyticsService.init(process.env.AMPLITUDE_KEY);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.STAGE,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.getCurrentRoute()?.name;
        if (previousRouteName !== currentRouteName) {
          await analyticsService.logEvent('screen_view', {
            screen: currentRouteName,
            previous_screen: previousRouteName,
          });
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      {children}
    </NavigationContainer>
  );
}
