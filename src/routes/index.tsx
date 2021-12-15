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
import { Box } from 'native-base';

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
    return <Box flex={1} bg="background" />;
  }

  return <AppRoutes />;
};

export default Routes;
