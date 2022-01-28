import React from 'react';

import { Alert, FlatList } from 'react-native';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import type { LaunchProps } from '@types';

import { UpcomingLaunch } from '../launchcardupcoming';

function UpcomingLaunches() {
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
          title="Upcoming"
          subtitle="See all"
          onPress={() => {
            // TODO - open all launches screen
            Alert.alert('In development');
          }}
        />
      </Atoms.Box>

      <FlatList
        data={launches.slice(0, 5)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24 }}
        horizontal
        renderItem={renderItem}
      />
    </Atoms.Box>
  );
}

const UpcomingLaunchesWithAnimation = React.memo(
  withAnimation(UpcomingLaunches, 650),
);

export { UpcomingLaunchesWithAnimation as UpcomingLaunches };
