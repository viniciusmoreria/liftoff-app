import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

const getUsername = async (): Promise<string | null> => {
  const username = await AsyncStorage.getItem('name');

  return username;
};

export function useUsername() {
  return useQuery(['username'], getUsername);
}

export const setUsername = async (username: string) => {
  await AsyncStorage.setItem('name', username);

  return username;
};

const getUserProfilePicture = async (): Promise<string | null> => {
  const userProfilePicture = await AsyncStorage.getItem('profile-image');

  return userProfilePicture;
};

export function useUserProfilePicture() {
  return useQuery(['profile-image'], getUserProfilePicture);
}

export const setUserProfilePicture = async (picture: string) => {
  await AsyncStorage.setItem('profile-image', picture);

  return picture;
};
