import React from 'react';

import { Box, Heading, Row, ScrollView, Text } from 'native-base';

import { useUpcomingLaunches } from '@hooks/useLaunches';

export default function UpcomingLaunches() {
  const { data: launches } = useUpcomingLaunches();

  if (!launches) {
    return null;
  }

  return (
    <>
      <Row alignItems="center" justifyContent="space-between">
        <Heading color="white" mt="8" size="sm" fontWeight={900}>
          Upcoming
        </Heading>

        <Heading color="white" mt="8" size="xs" fontWeight={900}>
          See all
        </Heading>
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
    </>
  );
}
