import React, { ReactNode } from 'react';

import { ErrorBoundary } from '@components/error-boundary';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useExpoUpdates } from '@hooks/use-expo-updates';
import { SafeAreaProvider } from '@libs/safe-area';
import { NavigationProvider } from '@navigation/navigation-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export const AppProviders = ({ children }: { children: ReactNode }) => {
  useExpoUpdates();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationProvider>
            <ErrorBoundary>
              <BottomSheetModalProvider>
                {children}
                <FlashMessage position="bottom" />
              </BottomSheetModalProvider>
            </ErrorBoundary>
          </NavigationProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
