import { useCallback, useState } from 'react';
import { ActionSheetIOS, Alert, Image, Pressable, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useBottomSheet } from '@hooks/use-bottom-sheet';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { isIOS, isNameValid } from '@libs/utilities';
import { useUserStore } from '@store/userStore';
import * as ImagePicker from 'expo-image-picker';

export const UserProfileSheet = () => {
  const { logEvent } = useAnalytics();
  const { setUsername, profilePicture, setProfilePicture } = useUserStore();
  const { closeSheet } = useBottomSheet();

  const [name, setName] = useState('');

  const handleSubmitName = useCallback(async () => {
    logEvent('profile_name_change', { name });
    setUsername(name.trim());
    setName('');
    closeSheet();
  }, [closeSheet, logEvent, name, setUsername]);

  const pickImage = useCallback(async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.cancelled) {
      setProfilePicture(`data:image/jpg;base64,${result.base64}`);
    }
  }, [setProfilePicture]);

  const openCamera = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.cancelled) {
      setProfilePicture(`data:image/jpg;base64,${result.base64}`);
    }
  }, [setProfilePicture]);

  const handleOpenSheet = useCallback(() => {
    if (isIOS) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose Photo'],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'dark',
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            logEvent('profile_sheet_open_camera');
            openCamera();
          }

          if (buttonIndex === 2) {
            logEvent('profile_sheet_open_gallery');
            pickImage();
          }
        }
      );
    } else {
      Alert.alert(
        'Update Profile Picture',
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Take Photo',
            onPress: openCamera,
          },
          {
            text: 'Choose Photo',
            onPress: pickImage,
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }, [logEvent, openCamera, pickImage]);

  return (
    <View className="pt-3 pb-4">
      <Pressable className="items-center" onPress={handleOpenSheet}>
        <View>
          <Image
            source={profilePicture ? { uri: profilePicture } : PlaceholderUserPicture}
            className="h-20 w-20 rounded-full"
          />

          <View className="absolute w-10 h-10 rounded-full bg-[#7c7c7cc1] items-center justify-center right-0 -bottom-2">
            <Ionicons name="camera" color="white" size={22} />
          </View>
        </View>
      </Pressable>

      <Text className="text-white text-xl font-bold text-center mt-9">
        What you would like to be called?
      </Text>

      <View className="items-center justify-center">
        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1.6,
            marginTop: 12,
            marginBottom: 52,
            width: '100%',
            height: 48,
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
          }}
        />

        <Pressable
          onPress={handleSubmitName}
          disabled={!isNameValid.test(name)}
          className="bg-secondary w-full py-3 px-4 rounded-lg items-center"
          style={{
            opacity: isNameValid.test(name) ? 1 : 0.5,
          }}
        >
          <Text>
            <Text className="text-white font-bold text-md">Confirm</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
