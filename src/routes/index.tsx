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
import AppLoading from 'expo-app-loading';

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

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return <AppRoutes />;
};

export default Routes;
