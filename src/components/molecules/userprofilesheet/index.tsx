import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQueryClient } from 'react-query';

import { ProfilePic } from '@assets/icons';
import * as Atoms from '@components/atoms';
import {
  setUsername,
  setUserProfilePicture,
  useBottomSheet,
  useUserProfilePicture,
} from '@hooks/index';
import { isNameValid } from '@utils/helpers';

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      mutateAsyncPicture(result.uri);
    }
  };

  return (
    <Atoms.Box sx={{ pt: '12px', pb: '42px' }}>
      <Atoms.Pressable
        sx={{
          alignItems: 'center',
        }}
        onPress={pickImage}
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
