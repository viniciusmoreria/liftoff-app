import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from './createSelectors';

interface PreferencesState {
  allowTenMinutesNotifications: boolean;
  setAllowTenMinutesNotifications: (allow: boolean) => void;
  allowOneHourNotifications: boolean;
  setAllowOneHourNotifications: (allow: boolean) => void;
  allowOneDayNotifications: boolean;
  setAllowOneDayNotifications: (allow: boolean) => void;
}

const usePreferencesStoreBase = create(
  persist<PreferencesState>(
    (set) => ({
      allowTenMinutesNotifications: false,
      setAllowTenMinutesNotifications: (allow) => set({ allowTenMinutesNotifications: allow }),
      allowOneHourNotifications: false,
      setAllowOneHourNotifications: (allow) => set({ allowOneHourNotifications: allow }),
      allowOneDayNotifications: false,
      setAllowOneDayNotifications: (allow) => set({ allowOneDayNotifications: allow }),
    }),
    {
      name: '@liftoff-preferences-store',
      getStorage: () => AsyncStorage,
    }
  )
);

export const usePreferencesStore = createSelectors(usePreferencesStoreBase);
