import React from 'react';

import { Box, FlatList, Row, Text } from 'native-base';

import { usePastLaunches } from '@hooks/useLaunches';
import { LaunchProps } from '@types';

import withAnimatedBox from '../withAnimatedBox';
import { PastLaunch } from './pastlaunch.component';

function PastLaunches() {
  const { data: launches } = usePastLaunches();

  if (!launches?.length) {
    return (
      <Box mt="6">
        <Box pl="4">
          <Text color="white" fontSize="lg" fontWeight={700}>
            Recent
          </Text>
        </Box>

        <Box w="100%" py="4" pl="4">
          <Text color="white" fontSize="sm" fontWeight={700}>
            Something went wrong while fetching recent launches, please try
            again later
          </Text>
        </Box>
      </Box>
    );
  }

  const renderItem = ({ item: launch }: { item: LaunchProps }) => {
    return <PastLaunch key={launch.id} launch={launch} />;
  };

  return (
    <Box mt="6">
      <Row alignItems="center" justifyContent="space-between" pl="4">
        <Text color="white" fontSize="lg" fontWeight={700}>
          Recent
        </Text>

        <Text color="white" fontSize="sm" fontWeight={700}>
          Show more
        </Text>
      </Row>

      <FlatList
        data={launches.slice(0, 5)}
        renderItem={renderItem}
        horizontal
        py="4"
        pl="4"
      />
    </Box>
  );
}

export default withAnimatedBox(PastLaunches, 800);
