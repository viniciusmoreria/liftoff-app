import { useCallback, useEffect } from 'react';

import { ErrorBoundary } from '@components/error-boundary';
import { BottomSheetProvider } from '@hooks/use-bottom-sheet';
import { SafeAreaProvider } from '@libs/safe-area';
import { isAndroid } from '@libs/utilities';
import { NavigationProvider } from '@navigation/navigation-provider';
import { usePreferencesStore } from '@store/preferencesStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 20, // 20 seconds
    },
  },
});

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

mobileAds().initialize();

export const AppProviders = ({ children }: { children: JSX.Element }) => {
  const { setNotificationPreference } = usePreferencesStore();

  async function getNotificationPermissionStatus() {
    if (isAndroid) {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    const status = await Notifications.getPermissionsAsync();
    return status.granted;
  }

  const requestNotificationPermission = useCallback(async () => {
    const granted = await getNotificationPermissionStatus();

    if (!granted) {
      const status = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      if (status.granted) {
        setNotificationPreference({ type: 'all', value: true });
      }
    }
  }, [setNotificationPreference]);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationProvider>
            <ErrorBoundary>
              <StatusBar animated style="light" />
              <BottomSheetProvider>{children}</BottomSheetProvider>
              <FlashMessage position="bottom" />
            </ErrorBoundary>
          </NavigationProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
