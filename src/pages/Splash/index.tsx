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
import { StackActions, useNavigation } from '@react-navigation/native';

import * as Molecules from '@components/molecules';
import {
  useUpcomingLaunches,
  useRecentLaunches,
  useArticles,
} from '@hooks/index';

export default function Splash() {
  const { dispatch } = useNavigation();

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

  React.useEffect(() => {
    if (isFontsLoaded && !isLoading) {
      setTimeout(() => {
        dispatch(StackActions.replace('HomeTabs'));
      }, 2500);
    }
  }, [dispatch, isFontsLoaded, isLoading]);

  return <Molecules.Loading />;
}
