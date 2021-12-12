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

import { LoadingAnimation } from '@assets/animations';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import { useRockets } from '@hooks/useRockets';

import AppRoutes from './app.routes';

const Routes = () => {
  const { isLoading: isLoadingRockets } = useRockets();
  const { isLoading: isLoadingLaunches } = useUpcomingLaunches();

  const [isFontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!isFontsLoaded || isLoadingRockets || isLoadingLaunches) {
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

  return <AppRoutes />;
};

export default Routes;
