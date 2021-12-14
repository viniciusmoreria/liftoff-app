import React from 'react';

import {
  useFonts,
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import LottieView from 'lottie-react-native';
import { Center } from 'native-base';

import { LoadingAnimation } from '@assets/animations';

import AppRoutes from './app.routes';

const Routes = () => {
  const [isFontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!isFontsLoaded) {
    return (
      <Center flex={1} bg="background">
        <LottieView source={LoadingAnimation} autoPlay style={{ width: 100 }} />
      </Center>
    );
  }

  return <AppRoutes />;
};

export default Routes;
