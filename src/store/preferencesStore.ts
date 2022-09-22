import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from './createSelectors';

type RemindersType =
  | 'twentyFourHour'
  | 'oneHour'
  | 'tenMinutes'
  | 'updates'
  | 'webcastLive'
  | 'all';

type LocationType =
  | 'cape'
  | 'van'
  | 'wallops'
  | 'china'
  | 'russia'
  | 'india'
  | 'japan'
  | 'french_guiana'
  | 'new_zealand';

export type NotificationPreference = {
  type: RemindersType | LocationType;
  value: boolean;
};

interface PreferencesState {
  all: boolean;
  twentyFourHour: boolean;
  oneHour: boolean;
  tenMinutes: boolean;
  updates: boolean;
  webcastLive: boolean;
  cape: boolean;
  van: boolean;
  wallops: boolean;
  china: boolean;
  russia: boolean;
  india: boolean;
  japan: boolean;
  french_guiana: boolean;
  new_zealand: boolean;
  setNotificationPreference: ({ type, value }: NotificationPreference) => void;
}

async function changeSubscription(
  topic: NotificationPreference['type'],
  value: NotificationPreference['value']
) {
  if (value) {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to ${topic}`);
  } else {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from ${topic}`);
  }
}

const topics = [
  'all',
  'twentyFourHour',
  'oneHour',
  'tenMinutes',
  'cape',
  'van',
  'wallops',
  'china',
  'russia',
  'india',
  'japan',
  'french_guiana',
  'new_zealand',
];

const usePreferencesStoreBase = create(
  persist<PreferencesState>(
    (set) => ({
      all: false,
      twentyFourHour: false,
      oneHour: false,
      tenMinutes: false,
      updates: false,
      webcastLive: false,
      cape: false,
      van: false,
      wallops: false,
      china: false,
      russia: false,
      india: false,
      japan: false,
      french_guiana: false,
      new_zealand: false,
      setNotificationPreference: async ({ type, value }: NotificationPreference) => {
        if (type === 'all') {
          topics.map((topic) => set({ [topic]: value }));
          changeSubscription('all', value);
          return;
        }
        set({ [type]: value });
        changeSubscription(type, value);
      },
    }),
    {
      name: '@liftoff-preferences-store',
      getStorage: () => AsyncStorage,
    }
  )
);

export const usePreferencesStore = createSelectors(usePreferencesStoreBase);
