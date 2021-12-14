import React from 'react';

import { Box, Row, ScrollView, Text } from 'native-base';

import { useUpcomingLaunches } from '@hooks/useLaunches';

import { UpcomingLaunch } from './upcomingLaunch';

export default function UpcomingLaunches() {
  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return null;
  }

  return (
    <Box mt="6">
      <Row alignItems="center" justifyContent="space-between" pl="4">
        <Text color="white" fontSize="lg" fontWeight={700}>
          Upcoming
        </Text>

        <Text color="white" fontSize="sm" fontWeight={700}>
          See all
        </Text>
      </Row>

      <ScrollView w="100%" py="4" pl="4" horizontal>
        {launches.slice(1, 6).map((launch) => {
          return <UpcomingLaunch key={launch.id} launch={launch} />;
        })}
      </ScrollView>
    </Box>
  );
}
