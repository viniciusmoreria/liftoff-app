import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const getUsername = async (): Promise<string | null> => {
    const username = await AsyncStorage.getItem('name');
    return username;
  };

  const setUsername = async (username: string) => {
    await AsyncStorage.setItem('name', username);
    return username;
  };

  const getUserProfilePicture = async (): Promise<string | null> => {
    const userProfilePicture = await AsyncStorage.getItem('profile-image');
    return userProfilePicture;
  };

  const setUserProfilePicture = async (picture: string) => {
    await AsyncStorage.setItem('profile-image', picture);
    return picture;
  };

  const { data: username, status } = useQuery(['username'], getUsername);
  const { data: userProfilePicture, status: profilePictureStatus } = useQuery(
    ['userProfilePicture'],
    getUserProfilePicture
  );

  return {
    username,
    setUsername,
    status,
    userProfilePicture,
    setUserProfilePicture,
    profilePictureStatus,
  };
}
