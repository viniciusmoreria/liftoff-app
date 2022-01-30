import React from 'react';

import { ProfilePic } from '@assets/icons';
import * as Atoms from '@components/atoms';
import withAnimation from '@components/withAnimation';
import {
  useBottomSheet,
  useUsername,
  useUserProfilePicture,
} from '@hooks/index';
import { greet } from '@utils/helpers';

import { UserProfileSheet } from '../userprofilesheet';

function Greeting() {
  const { data: username } = useUsername();
  const { data: userProfilePic } = useUserProfilePicture();

  const { setSheetContent } = useBottomSheet();

  return (
    <Atoms.Pressable
      onPress={() =>
        setSheetContent({
          content: <UserProfileSheet />,
        })
      }
    >
      <Atoms.Row
        sx={{
          pl: '24px',
          mt: '42px',
          mb: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Atoms.Box sx={{ flex: 1 }}>
          <Atoms.Text
            variant="text-xl"
            sx={{ color: 'white', fontWeight: 500 }}
          >
            {greet()},
          </Atoms.Text>

          <Atoms.Box
            sx={{
              alignSelf: username ? 'auto' : 'flex-start',
            }}
          >
            <Atoms.Text
              variant="text-xl"
              numberOfLines={2}
              ellipsizeMode="tail"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mr: '10px',
                mt: '3px',
              }}
            >
              {username || 'crew member'}
            </Atoms.Text>

            {!username && (
              <Atoms.DashedLine
                dashLength={4}
                dashThickness={3}
                dashGap={5}
                dashColor="#c32626"
                dashStyle={{
                  mt: '3px',
                }}
              />
            )}
          </Atoms.Box>
        </Atoms.Box>

        <Atoms.Image
          source={userProfilePic ? { uri: userProfilePic } : ProfilePic}
          sx={{
            height: 50,
            width: 50,
            borderRadius: 40,
            mr: '24px',
          }}
        />
      </Atoms.Row>
    </Atoms.Pressable>
  );
}

const GreetingWithAnimation = withAnimation(Greeting);

export { GreetingWithAnimation as Greeting };
