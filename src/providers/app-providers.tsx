import React, { ReactNode } from 'react';

import { ErrorBoundary } from '@components/error-boundary';
import { SafeAreaProvider } from '@libs/safe-area';
import { NavigationProvider } from '@navigation/navigation-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
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
