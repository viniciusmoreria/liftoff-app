import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

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

interface UserState {
  username: string;
  profilePicture: string;
}

interface UserActions {
  setUsername: (username: string) => void;
  setProfilePicture: (profilePicture: string) => void;
}

export const useUserStore = create(
  persist<UserState & UserActions>(
    (set) => ({
      username: 'crew member',
      setUsername: (username) => set({ username }),
      profilePicture: '',
      setProfilePicture: (profilePicture) => set({ profilePicture }),
    }),
    {
      name: '@liftoff-user-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
