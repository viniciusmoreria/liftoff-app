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

import { LoadingAnimation } from '@assets/animations';
import * as Atoms from '@components/atoms';
import {
  useUpcomingLaunches,
  useRecentLaunches,
  useArticles,
} from '@hooks/index';

import AppRoutes from './app.routes';

function LoadingComponent() {
  return (
    <Atoms.Center sx={{ flex: 1 }}>
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </Atoms.Center>
  );
}

const Routes = () => {
  const [isFontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  const { isLoading: isLoadingLaunches } = useUpcomingLaunches();
  const { isLoading: isLoadingPastLaunches } = useRecentLaunches();
  const { isLoading: isLoadingArticles } = useArticles();

  const isLoading =
    isLoadingLaunches || isLoadingPastLaunches || isLoadingArticles;

  return (
    <Atoms.Box sx={{ flex: 1 }}>
      {(!isFontsLoaded || isLoading) && <LoadingComponent />}
      {isFontsLoaded && !isLoading && <AppRoutes />}
    </Atoms.Box>
  );
};

export { Routes };
