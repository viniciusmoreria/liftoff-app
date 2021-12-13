import React from 'react';

import { Box, Row, ScrollView, Text } from 'native-base';

import { useUpcomingLaunches } from '@hooks/useLaunches';

export default function UpcomingLaunches() {
  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return null;
  }

  return (
    <Box mt="6">
      <Row alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="lg" fontWeight={700}>
          Upcoming
        </Text>

        <Text color="white" fontSize="sm" fontWeight={700}>
          See all
        </Text>
      </Row>

      <ScrollView mt="4" w="100%" py="4" horizontal>
        {launches.slice(1, 6).map((launch) => {
          return (
            <Box key={launch.id} mr="4">
              <Text color="white" fontSize="lg" fontWeight={900}>
                {launch.name}
              </Text>

              <Row justifyContent="space-between" mt="1" />
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
}
