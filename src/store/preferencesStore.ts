import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from './createSelectors';

export type NotificationPreference = {
  type: 'twentyFourHour' | 'oneHour' | 'tenMinutes' | 'updates' | 'webcastLive' | 'all';
  value: boolean;
};

interface PreferencesState {
  allowTenMinutesNotifications: boolean;
  allowOneHourNotifications: boolean;
  allowOneDayNotifications: boolean;
  allowLivestreamNotifications: boolean;
  allowLaunchUpdateNotifications: boolean;
  setNotificationPreference: ({ type, value }: NotificationPreference) => void;
}

async function changeSubscription(
  topic: NotificationPreference['type'],
  value: NotificationPreference['value']
) {
  if (value) {
    await messaging().subscribeToTopic(topic);
  } else {
    await messaging().unsubscribeFromTopic(topic);
  }
}

const usePreferencesStoreBase = create(
  persist<PreferencesState>(
    (set) => ({
      allowTenMinutesNotifications: false,
      allowOneHourNotifications: false,
      allowOneDayNotifications: false,
      allowLivestreamNotifications: false,
      allowLaunchUpdateNotifications: false,
      setNotificationPreference: async ({ type, value }: NotificationPreference) => {
        switch (type) {
          case 'twentyFourHour':
            set({ allowOneDayNotifications: value });
            changeSubscription('twentyFourHour', value);
            break;
          case 'oneHour':
            set({ allowOneHourNotifications: value });
            changeSubscription('oneHour', value);
            break;
          case 'tenMinutes':
            set({ allowTenMinutesNotifications: value });
            changeSubscription('tenMinutes', value);
            break;
          case 'updates':
            set({ allowLaunchUpdateNotifications: value });
            changeSubscription('updates', value);
            break;
          case 'webcastLive':
            set({ allowLivestreamNotifications: value });
            changeSubscription('webcastLive', value);
            break;
          case 'all':
            set({
              allowOneDayNotifications: value,
              allowOneHourNotifications: value,
              allowTenMinutesNotifications: value,
              allowLivestreamNotifications: value,
              allowLaunchUpdateNotifications: value,
            });
            changeSubscription('twentyFourHour', value);
            changeSubscription('oneHour', value);
            changeSubscription('tenMinutes', value);
            changeSubscription('updates', value);
            changeSubscription('webcastLive', value);
            break;
        }
      },
    }),
    {
      name: '@liftoff-preferences-store',
      getStorage: () => AsyncStorage,
    }
  )
);

export const usePreferencesStore = createSelectors(usePreferencesStoreBase);
