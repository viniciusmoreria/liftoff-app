import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIntl } from 'react-intl';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import type { Routes } from '@routes/app.routes';
import type { LaunchProps } from '@types';

import { UpcomingLaunch } from '../launchcardupcoming';

type NavigationParam = NativeStackNavigationProp<Routes, 'Launches'>;

function UpcomingLaunches() {
  const { navigate } = useNavigation<NavigationParam>();
  const { formatMessage } = useIntl();

  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return (
      <Atoms.Box
        sx={{
          mt: '36px',
          pl: '24px',
        }}
      >
        <Molecules.SectionTitle title="Upcoming" />

        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          No Spacex upcoming launches at the moment
        </Atoms.Text>
      </Atoms.Box>
    );
  }

  const renderItem = ({ item: launch }: { item: LaunchProps }) => {
    return <UpcomingLaunch key={launch.id} launch={launch} />;
  };

  return (
    <Atoms.Box
      sx={{
        mt: '36px',
      }}
    >
      <Atoms.Box sx={{ pl: '24px' }}>
        <Molecules.SectionTitle
          title={formatMessage({ id: 'UPCOMING_LAUNCHES.TITLE' })}
          subtitle="See all"
          onPress={() => navigate('Launches')}
        />
      </Atoms.Box>

      <Molecules.Carousel
        data={launches.slice(0, 5)}
        renderItem={renderItem}
        slideStyle={{
          paddingHorizontal: 24,
        }}
      />
    </Atoms.Box>
  );
}

const UpcomingLaunchesWithAnimation = React.memo(
  withAnimation(UpcomingLaunches, 650),
);

export { UpcomingLaunchesWithAnimation as UpcomingLaunches };
