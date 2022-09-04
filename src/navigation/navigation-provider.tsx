import { ReactNode, useRef } from 'react';

import { Sentry } from '@libs/sentry';
import analytics from '@react-native-firebase/analytics';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();

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
