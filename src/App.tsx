import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DripsyProvider } from 'dripsy';
import * as Updates from 'expo-updates';
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

  React.useEffect(() => {
    async function updateApp() {
      if (!__DEV__) {
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          await Updates.fetchUpdateAsync();

          await Updates.reloadAsync();
        }
      }
    }

    updateApp();
  }, []);

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
