import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Alert, ActionSheetIOS } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';

import { ProfilePic } from '@assets/icons';
import * as Atoms from '@components/atoms';
import {
  setUsername,
  setUserProfilePicture,
  useBottomSheet,
  useUserProfilePicture,
} from '@hooks/index';
import { isIOS, isNameValid } from '@utils/helpers';

function UserProfileSheet() {
  const queryClient = useQueryClient();

  const { data: userProfilePic } = useUserProfilePicture();

  const { closeSheet } = useBottomSheet();

  const [name, setName] = React.useState('');

  const { mutateAsync } = useMutation(setUsername, {
    onSuccess: () => {
      queryClient.invalidateQueries('username');
    },
  });

  const { mutateAsync: mutateAsyncPicture } = useMutation(
    setUserProfilePicture,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile-image');
      },
    },
  );

  const handleSubmitName = React.useCallback(async () => {
    await mutateAsync(name.trim());
    setName('');
    closeSheet();
  }, [closeSheet, mutateAsync, name]);

  const pickImage = React.useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission to access camera roll is required to upload an image.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      mutateAsyncPicture(result.uri);
    }
  }, [mutateAsyncPicture]);

  const openCamera = React.useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission to access camera is required to upload an image.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      mutateAsyncPicture(result.uri);
    }
  }, [mutateAsyncPicture]);

  const handleOpenSheet = React.useCallback(() => {
    if (isIOS) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose Photo'],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'dark',
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            openCamera();
          }

          if (buttonIndex === 2) {
            pickImage();
          }
        },
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
        },
      );
    }
  }, [openCamera, pickImage]);

  return (
    <Atoms.Box sx={{ pt: '12px', pb: '42px' }}>
      <Atoms.Pressable
        sx={{
          alignItems: 'center',
        }}
        onPress={handleOpenSheet}
      >
        <Atoms.Box>
          <Atoms.Image
            source={userProfilePic ? { uri: userProfilePic } : ProfilePic}
            sx={{
              height: 75,
              width: 75,
              borderRadius: 40,
            }}
          />

          <Atoms.Box
            sx={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              bg: '#7c7c7cc1',
              bottom: -10,
              right: 0,
            }}
          >
            <Ionicons name="camera" color="white" size={22} />
          </Atoms.Box>
        </Atoms.Box>
      </Atoms.Pressable>

      <Atoms.Text
        variant="text-xl"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mt: '36px',
          textAlign: 'center',
        }}
      >
        What you would like to be called?
      </Atoms.Text>

      <Atoms.Box sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCompleteType="name"
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

        <Atoms.Button
          onPress={handleSubmitName}
          disabled={!isNameValid.test(name)}
          sx={{
            width: '100%',
            opacity: isNameValid.test(name) ? 1 : 0.5,
            bg: 'secondary',
            mb: 40,
          }}
          title="Confirm"
          textVariant="text-sm"
        />
      </Atoms.Box>
    </Atoms.Box>
  );
}

export { UserProfileSheet };
