import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { intervalToDuration, isAfter } from 'date-fns';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useDate, useUpcomingLaunches } from '@hooks/index';
import type { Routes } from '@routes/app.routes';
import type { LaunchProps } from '@types';
import { getLaunchStage, getTMinus } from '@utils/helpers';

type NavigationParam = NativeStackNavigationProp<Routes, 'LaunchDetail'>;

function NextLaunch() {
  const { navigate } = useNavigation<NavigationParam>();
  const { data: launches } = useUpcomingLaunches();

  const [nextLaunch, setNextLaunch] = React.useState<LaunchProps | undefined>();

  React.useLayoutEffect(() => {
    if (launches?.length) {
      const { hours } = intervalToDuration({
        start: new Date(),
        end: new Date(launches[0].date_local),
      });

      if (
        isAfter(new Date(), new Date(launches[0].date_local)) &&
        Number(hours) > 2
      ) {
        setNextLaunch(launches[1]);

        return;
      }

      setNextLaunch(launches[0]);
    }
  }, [launches]);

  const date = useDate({
    date: nextLaunch?.date_local ? nextLaunch.date_local : new Date(),
  });

  const tMinus = getTMinus(new Date(date));
  const stage = getLaunchStage(new Date(date));

  if (!nextLaunch) {
    return <Atoms.Box />;
  }

  return Number(tMinus.days) <= 7 ? (
    <Atoms.Pressable
      onPress={() =>
        navigate('LaunchDetail', {
          launch: nextLaunch,
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
          bg: 'background',
        }}
      >
        <Atoms.Box sx={{ justifyContent: 'space-around' }}>
          <Atoms.Text sx={{ color: 'white', fontWeight: 'bold' }}>
            {nextLaunch.name}
          </Atoms.Text>

          <Molecules.TCountLabel stage={stage} />
        </Atoms.Box>

        <Molecules.Timer stage={stage} tMinus={tMinus} />
      </Atoms.Row>
    </Atoms.Pressable>
  ) : (
    <Atoms.Box />
  );
}

const NextLaunchWithAnimation = React.memo(withAnimation(NextLaunch, 500));

export { NextLaunchWithAnimation as NextLaunch };
