import React from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { ProfilePic } from '@assets/icons';
import * as Atoms from '@components/atoms';
import {
  setUsername,
  setUserProfilePicture,
  useBottomSheet,
  useUsername,
  useUserProfilePicture,
} from '@hooks/index';

function ResetProfileSheet() {
  const queryClient = useQueryClient();
  const { closeSheet } = useBottomSheet();

  const { data: username } = useUsername();
  const { data: userProfilePic } = useUserProfilePicture();

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

  return (
    <Atoms.Box sx={{ pt: '12px', pb: '42px' }}>
      <Atoms.Box
        sx={{
          alignItems: 'center',
        }}
      >
        <Atoms.Image
          source={userProfilePic ? { uri: userProfilePic } : ProfilePic}
          sx={{
            height: 75,
            width: 75,
            borderRadius: 40,
          }}
        />
      </Atoms.Box>

      <Atoms.Text
        variant="text-xl"
        numberOfLines={3}
        ellipsizeMode="tail"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mt: '36px',
          textAlign: 'center',
        }}
      >
        Hi, {username ?? 'crew member'}
      </Atoms.Text>

      <Atoms.Text
        variant="text-lg"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mt: '36px',
          mb: '12px',
          textAlign: 'center',
        }}
      >
        Are you sure you want to reset your information?
      </Atoms.Text>

      <Atoms.Row
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '24px',
          mb: '42px',
        }}
      >
        <Atoms.Button
          onPress={closeSheet}
          sx={{ bg: 'secondary' }}
          title="Nop"
          textVariant="text-sm"
        />

        <Atoms.Box sx={{ width: 12 }} />

        <Atoms.Button
          onPress={() => {
            mutateAsync('');
            mutateAsyncPicture('');
            closeSheet();
          }}
          title="Reset"
          textVariant="text-sm"
        />
      </Atoms.Row>
    </Atoms.Box>
  );
}

export { ResetProfileSheet };
