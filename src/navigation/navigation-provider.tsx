import React, { useRef } from 'react';

import { Sentry } from '@libs/sentry';
import { NavigationContainer } from '@react-navigation/native';

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
export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const navigation = useRef(null);

  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigation);
      }}
    >
      {children}
    </NavigationContainer>
  );
}
