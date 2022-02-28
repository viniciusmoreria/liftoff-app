import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIntl } from 'react-intl';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useRecentLaunches } from '@hooks/useLaunches';
import type { Routes } from '@routes/app.routes';
import type { LaunchProps } from '@types';

import { Launch } from '../launchcard';

type NavigationParam = NativeStackNavigationProp<Routes, 'Launches'>;

function RecentLaunches() {
  const { navigate } = useNavigation<NavigationParam>();

  const { formatMessage } = useIntl();
  const { data: launches } = useRecentLaunches();

  if (!launches?.length) {
    return (
      <Atoms.Box
        sx={{
          pl: '24px',
          height: 220,
        }}
      >
        <Molecules.SectionTitle
          title={formatMessage({ id: 'RECENT_LAUNCHES.TITLE' })}
        />

        <Atoms.Text variant="text-xs" sx={{ flex: 1, color: 'white' }}>
          {formatMessage({ id: 'RECENT_LAUNCHES.FETCH_ERROR' })}
        </Atoms.Text>
      </Atoms.Box>
    );
  }

  const renderItem = ({ item: launch }: { item: LaunchProps }) => {
    return <Launch key={launch.id} launch={launch} />;
  };

  return (
    <Atoms.Box
      sx={{
        mt: '36px',
      }}
    >
      <Atoms.Box sx={{ pl: '24px' }}>
        <Molecules.SectionTitle
          title={formatMessage({ id: 'RECENT_LAUNCHES.TITLE' })}
          subtitle={formatMessage({ id: 'LABELS.SEE_ALL' })}
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

const RecentLaunchesWithAnimation = React.memo(
  withAnimation(RecentLaunches, 800),
);

export { RecentLaunchesWithAnimation as RecentLaunches };
