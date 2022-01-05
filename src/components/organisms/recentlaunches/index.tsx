import React from 'react';

import { Alert, FlatList } from 'react-native';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimatedBox from '@components/withAnimatedBox';
import { useRecentLaunches } from '@hooks/useLaunches';
import { LaunchProps } from '@types';

import { Launch } from '../launchcard';

function RecentLaunches() {
  const { data: launches } = useRecentLaunches();

  if (!launches?.length) {
    return (
      <Atoms.Box
        sx={{
          mt: '36px',
          pl: '24px',
        }}
      >
        <Molecules.SectionTitle title="Recent" />

        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          Something went wrong while fetching recent launches, please try again
          later
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
          title="Recent"
          subtitle="Show more"
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

export default withAnimatedBox(RecentLaunches, 800);
