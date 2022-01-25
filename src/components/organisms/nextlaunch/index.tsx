import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useUpcomingLaunches } from '@hooks/index';
import type { Routes } from '@routes/app.routes';
import { getLaunchStage, getTMinus } from '@utils/helpers';

import { Timer } from '../timer';

type NavigationParam = NativeStackNavigationProp<Routes, 'LaunchDetail'>;

function NextLaunch() {
  const { navigate } = useNavigation<NavigationParam>();
  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return <Atoms.Box />;
  }

  const { days } = getTMinus(new Date(launches[0].date_local));
  const stage = getLaunchStage(new Date(launches[0].date_local));

  return Number(days) <= 7 ? (
    <Atoms.Pressable
      onPress={() =>
        navigate('LaunchDetail', {
          launch: launches[0],
        })
      }
    >
      <Atoms.Row
        sx={{
          mt: '36px',
          mb: '12px',
          pl: '24px',
          pr: '24px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Atoms.Box sx={{ justifyContent: 'space-around' }}>
          <Atoms.Text sx={{ color: 'white', fontWeight: 'bold' }}>
            {launches[0].name}
          </Atoms.Text>

          <Molecules.TCountLabel stage={stage} />
        </Atoms.Box>

        <Timer launchDate={new Date(launches[0].date_local)} stage={stage} />
      </Atoms.Row>
    </Atoms.Pressable>
  ) : (
    <Atoms.Box />
  );
}

const NextLaunchWithAnimation = withAnimation(NextLaunch, 500);

export { NextLaunchWithAnimation as NextLaunch };
