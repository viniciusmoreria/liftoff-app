import React from 'react';

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import LottieView from 'lottie-react-native';
import { Center } from 'native-base';

import { RedDotAnimation } from '@assets/animations';
import { usePastLaunches, useUpcomingLaunches } from '@hooks/useLaunches';

import AppRoutes from './app.routes';

const Routes = () => {
  const [isFontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  const { isLoading: isLoadingLaunches } = useUpcomingLaunches();

  const { isLoading: isLoadingPastLaunches } = usePastLaunches();

  if (!isFontsLoaded || isLoadingLaunches || isLoadingPastLaunches) {
    return (
      <Center flex={1} bg="background">
        <LottieView source={RedDotAnimation} autoPlay style={{ width: 100 }} />
      </Center>
    );
  }

  return <AppRoutes />;
};

export default Routes;
