import React from 'react';

import { Box, Heading, Row, ScrollView, Text } from 'native-base';

import { usePastLaunches } from '@hooks/useLaunches';

export default function PastLaunches() {
  const { data: launches } = usePastLaunches();

  if (!launches?.length) {
    return null;
  }

  return (
    <>
      <Row alignItems="center" justifyContent="space-between">
        <Heading color="white" mt="8" size="sm" fontWeight={900}>
          Recent
        </Heading>

        <Heading color="primary" mt="8" size="xs" fontWeight={900}>
          See all
        </Heading>
      </Row>

      <ScrollView mt="4" w="100%" py="4" horizontal>
        {launches.slice(0, 5).map((launch) => {
          return (
            <Box key={launch.id} mr="4">
              <Text color="white" fontSize="lg" fontWeight={900}>
                {launch.name}
              </Text>
            </Box>
          );
        })}
      </ScrollView>
    </>
  );
}
