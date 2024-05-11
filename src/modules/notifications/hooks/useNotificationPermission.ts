import { isAndroid } from '@libs/utils/platform';
import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';

import { useNotificationStore } from '../store/notification-store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotificationPermission = () => {
  const { notificationPreferences, setNotificationPreference } = useNotificationStore();

  const getNotificationPermissionStatus = useCallback(async () => {
    if (isAndroid) {
      await Notifications.setNotificationChannelAsync('liftoff', {
        name: 'Liftoff',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    const status = await Notifications.getPermissionsAsync();
    return status.granted;
  }, []);

  const requestPermission = useCallback(async () => {
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
        notificationPreferences.forEach((preference) => {
          setNotificationPreference({ type: preference.type, value: true });
        });
      }
    }
  }, [notificationPreferences, setNotificationPreference]);

  return {
    requestPermission,
  };
};
