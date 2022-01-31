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

  const isPendingConfirmation =
    launch.date_precision !== 'hour' && launch.date_precision !== 'day';

  return (
    <Atoms.Pressable
      onPress={() =>
        navigate('LaunchDetail', {
          launch,
        })
      }
    >
      <Atoms.Box sx={{ mt: 0 }}>
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
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Atoms.Box>
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
                  fontSize: 10,
                  fontWeight: 500,
                  mt: '3px',
                }}
              >
                {launch?.rocket.name}
              </Atoms.Text>
            </Atoms.Box>

            <Molecules.LaunchDateBadge launch={launch} />
          </Atoms.Row>

          <Atoms.Row
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Atoms.Row
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Atoms.Badge sx={{ height: 15 }}>
                <Atoms.Text
                  variant="text-xs"
                  sx={{
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 500,
                  }}
                >
                  {launch.payloads[0].orbit}
                </Atoms.Text>
              </Atoms.Badge>
            </Atoms.Row>

            <Atoms.Center sx={{ bg: 'transparent' }}>
              {isPendingConfirmation ? (
                <Atoms.Text
                  variant="text-xs"
                  sx={{
                    color: 'primary',
                    fontSize: 10,
                    fontWeight: 500,
                  }}
                >
                  Date pending
                </Atoms.Text>
              ) : (
                <Molecules.LaunchDate date={launch.date_local} />
              )}
            </Atoms.Center>
          </Atoms.Row>
        </Atoms.Card>
      </Atoms.Box>
    </Atoms.Pressable>
  );
}

export { UpcomingLaunch };
