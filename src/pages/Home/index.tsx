import React from 'react';

import { Center, Heading, ScrollView, StatusBar, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import NextLaunch from '@components/nextlaunch';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import { useRockets } from '@hooks/useRockets';
import { greeting } from '@utils/helpers';

export default function Home() {
  const {
    data: launches,
    isLoadingError,
    refetch: refetchLaunches,
  } = useUpcomingLaunches();
  const { data: rockets, refetch: refetchRockets } = useRockets();

  const handleRefreshData = React.useCallback(async () => {
    await refetchLaunches();
    await refetchRockets();
  }, [refetchLaunches, refetchRockets]);

  if (isLoadingError || !launches || !rockets) {
    return (
      <Center flex={1} bg="background">
        <Heading color="primary" size="sm" mb="4">
          Error loading launches
        </Heading>

        <TouchableOpacity onPress={handleRefreshData}>
          <Text color="white" fontSize="sm" fontWeight={700}>
            Try again
          </Text>
        </TouchableOpacity>
      </Center>
    );
  }

  return (
    <ScrollView flex={1} bg="background" px="4">
      <StatusBar animated barStyle="light-content" />

      <Heading color="white" fontWeight="500" mt="16" pl="4">
        {greeting()}
      </Heading>

      <NextLaunch />
    </ScrollView>
  );
}
