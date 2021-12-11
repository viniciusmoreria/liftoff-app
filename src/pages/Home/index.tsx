import React from 'react';

import { Box, Text } from 'native-base';

export default function Home() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" bg="black">
      <Text color="white" fontSize="3xl">
        Hello from Native Base!
      </Text>
    </Box>
  );
}
