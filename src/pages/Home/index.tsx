import React from 'react';

import LottieView from 'lottie-react-native';
import { Box, Center, Heading, ScrollView, StatusBar, Text } from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useQueryClient } from 'react-query';

import { LoadingAnimation } from '@assets/animations';
import AnimatedBox from '@components/animatedbox';
import NextLaunch from '@components/nextlaunch';
import PastLaunches from '@components/pastlaunches';
import UpcomingLaunches from '@components/upcominglaunches';
import { usePastLaunches, useUpcomingLaunches } from '@hooks/useLaunches';
import { greeting } from '@utils/helpers';

import theme from '../../styles/theme';

export default function Home() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingLaunches, isError: errorUpcomingLaunches } =
    useUpcomingLaunches();

  const { isLoading: isLoadingPastLaunches, isError: errorPastLaunches } =
    usePastLaunches();

  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefreshData = React.useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries();
    setRefreshing(false);
  }, [queryClient]);

  if (isLoadingLaunches || isLoadingPastLaunches) {
    return <LoadingComponent />;
  }

  if (errorUpcomingLaunches || errorPastLaunches) {
    return <ErrorComponent />;
  }

  return (
    <ScrollView
      flex={1}
      bg="background"
      pr="4"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefreshData}
          tintColor="white"
          colors={['white']}
        />
      }
    >
      <StatusBar animated barStyle="light-content" />

      <AnimatedBox>
        <Box safeArea mt="6">
          <Heading color="white" fontWeight="500" pl="4">
            {greeting()}
          </Heading>
        </Box>
      </AnimatedBox>

      <AnimatedBox delay={500}>
        <NextLaunch />
      </AnimatedBox>

      <AnimatedBox delay={650}>
        <UpcomingLaunches />
      </AnimatedBox>

      <AnimatedBox delay={800}>
        <PastLaunches />
      </AnimatedBox>
    </ScrollView>
  );
}

function LoadingComponent() {
  return (
    <Center flex={1} bg="background">
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </Center>
  );
}

function ErrorComponent() {
  const queryClient = useQueryClient();

  const handleRefreshData = React.useCallback(async () => {
    await queryClient.refetchQueries();
  }, [queryClient]);

  return (
    <Center flex={1} bg="background">
      <Text color="primary" mb="2">
        Something went wrong
      </Text>

      <TouchableOpacity
        onPress={handleRefreshData}
        style={{
          backgroundColor: theme.colors.secondary,
          padding: 10,
          width: 100,
          alignItems: 'center',
          borderRadius: 16,
        }}
      >
        <Text color="white" fontSize="sm" fontWeight={700}>
          Try again
        </Text>
      </TouchableOpacity>
    </Center>
  );
}
