import React from 'react';

import { Box, Image, Text, ZStack } from 'native-base';

import { UpcomingBackground } from '@assets/images';
import { useUpcomingLaunches } from '@hooks/useLaunches';

export default function Home() {
  const { data } = useUpcomingLaunches();
  return (
    <Box flex={1} bg="background" px="4" safeArea>
      <ZStack mt="16" w="100%" h={250} justifyContent="flex-end">
        <Image
          source={UpcomingBackground}
          h="100%"
          w="full"
          resizeMode="cover"
          borderRadius="3xl"
          alt="spacex-rockets-launch"
        />

        <Box
          w="100%"
          p="4"
          bg={{
            linearGradient: {
              colors: ['transparent', 'background'],
              start: [0, 0.2],
              end: [0, 1],
            },
          }}
        >
          <Text color="white" fontSize="3xl" fontWeight={700}>
            {!!data?.length && data[0]?.name}
          </Text>
        </Box>
      </ZStack>
    </Box>
  );
}
