import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DripsyProvider } from 'dripsy';
import * as Updates from 'expo-updates';
import { AppStateStatus, LogBox, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';
import * as Sentry from 'sentry-expo';

import {
  BottomSheetProvider,
  useAppState,
  useOnlineManager,
  NotificationProvider,
} from './hooks';
import { Routes } from './routes';
import { theme } from './styles/theme';

Sentry.init({
  dsn: 'https://da82bac74a644e358c63c3377d820c05@o1133485.ingest.sentry.io/6180063',
  environment: Updates.releaseChannel,
});

if (__DEV__) {
  /*
    react-query causes these types of logs to be shown but they say that they are nothing to worry about
    this may be able to be removed after upgrading to RN 0.65
    ref: https://github.com/tannerlinsley/react-query/issues/1259
  */
  LogBox.ignoreLogs(['Setting a timer']);
}

const oneMinute = 1000 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: oneMinute },
  },
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

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
        <NavigationContainer>
          <DripsyProvider theme={theme}>
            <BottomSheetProvider>
              <NotificationProvider>
                <StatusBar
                  animated
                  barStyle="light-content"
                  backgroundColor={theme.colors.background}
                />
                <Routes />
              </NotificationProvider>
            </BottomSheetProvider>
          </DripsyProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
