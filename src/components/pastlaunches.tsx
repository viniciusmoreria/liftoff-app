import React from 'react';

import { Box, ScrollView, Text } from 'native-base';

import { usePastLaunches } from '@hooks/useLaunches';
import { useRockets } from '@hooks/useRockets';

export default function PastLaunches() {
  const { data: rockets } = useRockets();
  const { data: launches } = usePastLaunches();

  if (!launches?.length || !rockets) {
    return null;
  }

  return (
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
  );
}
