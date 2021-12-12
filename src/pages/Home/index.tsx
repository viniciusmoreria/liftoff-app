import React from 'react';

import {
  Box,
  Center,
  Heading,
  Row,
  ScrollView,
  StatusBar,
  Text,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import NextLaunch from '@components/nextlaunch';
import PastLaunches from '@components/pastlaunches';
import UpcomingLaunches from '@components/upcominglaunches';
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
      <Box pl="4">
        <StatusBar animated barStyle="light-content" />

        <Heading color="white" fontWeight="500" mt="16">
          {greeting()}
        </Heading>

        <NextLaunch />

        <Row alignItems="center" justifyContent="space-between">
          <Heading color="white" mt="8" size="sm" fontWeight={900}>
            Upcoming
          </Heading>

          <Heading color="white" mt="8" size="xs" fontWeight={900}>
            See all
          </Heading>
        </Row>

        <UpcomingLaunches />

        <Row alignItems="center" justifyContent="space-between">
          <Heading color="white" mt="8" size="sm" fontWeight={900}>
            Recent
          </Heading>

          <Heading color="white" mt="8" size="xs" fontWeight={900}>
            See all
          </Heading>
        </Row>

        <PastLaunches />
      </Box>
    </ScrollView>
  );
}
