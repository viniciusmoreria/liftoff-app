import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DripsyProvider } from 'dripsy';
import { AppStateStatus, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';

import { BottomSheetProvider, useAppState, useOnlineManager } from './hooks';
import { Routes } from './routes';
import { theme } from './styles/theme';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, cacheTime: 60000 } },
});

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <DripsyProvider theme={theme}>
          <BottomSheetProvider>
            <NavigationContainer>
              <StatusBar animated barStyle="light-content" />
              <Routes />
            </NavigationContainer>
          </BottomSheetProvider>
        </DripsyProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
