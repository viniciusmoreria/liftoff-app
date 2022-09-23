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
  leastOneReminder: boolean;
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

const topics: NotificationPreference['type'][] = [
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
    (set, get) => ({
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
      leastOneReminder: false,
      setNotificationPreference: async ({ type, value }: NotificationPreference) => {
        if (type === 'all') {
          changeSubscription('all', value);
          changeSubscription('updates', value);
          changeSubscription('webcastLive', value);
          set({ leastOneReminder: value });
          set({ all: value });
          set({ updates: value });
          set({ webcastLive: value });
          topics.map((topic) => {
            changeSubscription(topic, value);
            set({ [topic]: value });
          });
          return;
        }
        changeSubscription(type, value);
        set({ [type]: value });
        const leastOneReminder = topics.some((topic) => get()[topic]);
        set({ leastOneReminder });

        const all = topics.every((topic) => get()[topic]);
        if (all) {
          set({ all });
          changeSubscription('all', true);
        } else if (get().all) {
          set({ all });
          changeSubscription('all', false);
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
