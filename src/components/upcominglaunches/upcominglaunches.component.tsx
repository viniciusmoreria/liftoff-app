import React from 'react';

import { Box, FlatList, Row, Text } from 'native-base';

import { useUpcomingLaunches } from '@hooks/useLaunches';
import { LaunchProps } from '@types';

import withAnimatedBox from '../withAnimatedBox';
import { UpcomingLaunch } from './upcominglaunch.component';

function UpcomingLaunches() {
  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return (
      <Box mt="6">
        <Box pl="4">
          <Text color="white" fontSize="lg" fontWeight={700}>
            Upcoming
          </Text>
        </Box>

        <Box w="100%" py="4" pl="4">
          <Text color="white" fontSize="sm" fontWeight={700}>
            No upcoming launches at the moment
          </Text>
        </Box>
      </Box>
    );
  }

  const renderItem = ({ item: launch }: { item: LaunchProps }) => {
    return <UpcomingLaunch key={launch.id} launch={launch} />;
  };

  return (
    <Box mt="6">
      <Row alignItems="center" justifyContent="space-between" pl="4">
        <Text color="white" fontSize="lg" fontWeight={700}>
          Upcoming
        </Text>

        <Text color="white" fontSize="sm" fontWeight={700}>
          Show more
        </Text>
      </Row>

      <FlatList
        data={launches.slice(1, 6)}
        renderItem={renderItem}
        horizontal
        py="4"
        pl="4"
      />
    </Box>
  );
}

export default withAnimatedBox(UpcomingLaunches, 650);
