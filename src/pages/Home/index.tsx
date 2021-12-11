import React from 'react';

import { Box, Text } from 'native-base';

import { useUpcomingLaunches } from '@hooks/useLaunches';

export default function Home() {
  const { data } = useUpcomingLaunches();

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bg="black">
      <Text color="white" fontSize="2xl" fontWeight={900}>
        Next launch:
      </Text>

      <Text color="white" fontSize="3xl">
        {!!data?.length && data[0]?.name}
      </Text>
    </Box>
  );
}
