import messaging from '@react-native-firebase/messaging';
import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import { NotificationActions, NotificationPreference, NotificationState } from './types';

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

const topics: NotificationPreference['type'][] = [
  'twentyFourHour',
  'oneHour',
  'tenMinutes',
  'updates',
  'webcastLive',
  'cape',
  'van',
  'wallops',
  'china',
  'russia',
  'india',
  'japan',
  'french_guiana',
  'new_zealand',
  'kazakhstan',
];

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

export const useNotificationStore = create(
  persist<NotificationState & NotificationActions>(
    (set, get) => ({
      notificationPreferences: topics.map((topic) => ({
        type: topic,
        value: false,
      })),
      setNotificationPreference: (preference) => {
        set((state) => {
          const updatedPreferences = state.notificationPreferences.map((p) =>
            p.type === preference.type ? preference : p
          );

          return { notificationPreferences: updatedPreferences };
        });
        changeSubscription(preference.type, preference.value);
      },
      getPreference: (type: NotificationPreference['type']) => {
        return Boolean(
          get().notificationPreferences.find((preference) => preference.type === type)?.value
        );
      },
    }),
    {
      name: '@liftoff-notification-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
