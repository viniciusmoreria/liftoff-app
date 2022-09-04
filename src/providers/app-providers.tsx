import React, { ReactNode } from 'react';

import { ErrorBoundary } from '@components/error-boundary';
import { SafeAreaProvider } from '@libs/safe-area';
import { NavigationProvider } from '@navigation/navigation-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';

const oneMinute = 1000 * 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: oneMinute },
  },
});

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </NavigationProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
