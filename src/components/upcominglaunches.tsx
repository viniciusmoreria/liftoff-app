import React from 'react';

import { Box, Row, ScrollView, Text } from 'native-base';

import { useUpcomingLaunches } from '@hooks/useLaunches';
import { useRockets } from '@hooks/useRockets';

export default function UpcomingLaunches() {
  const { data: launches } = useUpcomingLaunches();
  const { data: rockets } = useRockets();

  if (!launches || !rockets) {
    return null;
  }

  return (
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
  );
}
