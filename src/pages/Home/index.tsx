import React from 'react';

import LottieView from 'lottie-react-native';
import { Box, Center, Heading, ScrollView, StatusBar, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { LoadingAnimation } from '@assets/animations';
import NextLaunch from '@components/nextlaunch';
import PastLaunches from '@components/pastlaunches';
import UpcomingLaunches from '@components/upcominglaunches';
import { usePastLaunches, useUpcomingLaunches } from '@hooks/useLaunches';
import { greeting } from '@utils/helpers';

export default function Home() {
  const {
    isLoading: isLoadingLaunches,
    isError: errorUpcomingLaunches,
    refetch: refetchLaunches,
  } = useUpcomingLaunches();

  const {
    isLoading: isLoadingPastLaunches,
    isError: errorPastLaunches,
    refetch: refetchPastLaunches,
  } = usePastLaunches();

  const handleRefreshData = React.useCallback(async () => {
    await refetchLaunches();
    await refetchPastLaunches();
  }, [refetchLaunches, refetchPastLaunches]);

  if (isLoadingLaunches || isLoadingPastLaunches) {
    return (
      <Center flex={1} bg="background">
        <LottieView
          source={LoadingAnimation}
          autoPlay
          loop
          style={{ width: 60 }}
        />
      </Center>
    );
  }

  if (errorUpcomingLaunches || errorPastLaunches) {
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

        <UpcomingLaunches />

        <PastLaunches />
      </Box>
    </ScrollView>
  );
}
