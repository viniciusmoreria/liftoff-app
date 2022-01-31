import React, { ComponentProps } from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import type { Routes } from '@routes/app.routes';
import type { LaunchProps } from '@types';

type LaunchInfoProps = ComponentProps<typeof Atoms.Box> & {
  launch: LaunchProps;
};

type NavigationParam = NativeStackNavigationProp<Routes, 'LaunchDetail'>;

function UpcomingLaunch({ launch, sx }: LaunchInfoProps) {
  const { navigate } = useNavigation<NavigationParam>();

  return (
    <Atoms.Pressable
      onPress={() =>
        navigate('LaunchDetail', {
          launch,
        })
      }
    >
      <Atoms.Box>
        <Atoms.Card
          sx={{
            mt: '16px',
            height: 100,
            width: '100%',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            ...sx,
          }}
        >
          <Atoms.Row
            sx={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Molecules.LaunchDateBadge launch={launch} />

            <Atoms.Box
              sx={{ height: '100%', width: 1.5, bg: 'background', mx: '16px' }}
            />

            <Atoms.Box sx={{ flex: 1 }}>
              <Atoms.Text
                variant="text-sm"
                sx={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
              >
                {launch.name}
              </Atoms.Text>

              <Atoms.Text
                variant="text-sm"
                sx={{
                  color: 'primary',
                  fontSize: 9,
                  fontWeight: 500,
                  mt: '3px',
                }}
              >
                {launch?.rocket.name}
              </Atoms.Text>
            </Atoms.Box>

            <Atoms.Box>
              <Atoms.Text
                variant="text-sm"
                sx={{
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Orbit
              </Atoms.Text>

              <Atoms.Text
                variant="text-sm"
                sx={{
                  textAlign: 'center',

                  color: 'primary',
                  fontSize: 9,
                  fontWeight: 500,
                  mt: '3px',
                }}
              >
                {launch.payloads[0].orbit}
              </Atoms.Text>
            </Atoms.Box>
          </Atoms.Row>
        </Atoms.Card>
      </Atoms.Box>
    </Atoms.Pressable>
  );
}

export { UpcomingLaunch };
