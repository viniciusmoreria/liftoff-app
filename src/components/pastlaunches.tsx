import React from 'react';

import { Box, Row, ScrollView, Text } from 'native-base';

import { usePastLaunches } from '@hooks/useLaunches';

export default function PastLaunches() {
  const { data: launches } = usePastLaunches();

  if (!launches?.length) {
    return null;
  }

  return (
    <Box mt="6">
      <Row alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="lg" fontWeight={700}>
          Recent
        </Text>

        <Text color="white" fontSize="sm" fontWeight={700}>
          See all
        </Text>
      </Row>

      <ScrollView mt="4" w="100%" py="4" horizontal>
        {launches.slice(0, 5).map((launch) => {
          return (
            <Box key={launch.id} mr="4">
              <Text color="white" fontSize="lg" fontWeight={700}>
                {launch.name}
              </Text>
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
}
