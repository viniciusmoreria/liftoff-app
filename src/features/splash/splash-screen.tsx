import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { LoadingAnimation } from '@assets/animations';
import { useArticles } from '@features/home/hooks/use-articles';
import { usePreviousLaunches } from '@features/home/hooks/use-previous-launches';
import { useUpcomingLaunches } from '@features/home/hooks/use-upcoming-launches';
import { RemoteConfig } from '@libs/firebase/remote-config';
import { Logger } from '@libs/logger';
import { RootStackParams } from '@navigation/types';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<RootStackParams, 'splash'>;

export const SplashScreen = ({ navigation }: Props) => {
  const { isLoading } = useUpcomingLaunches();
  const { isLoading: isLoadingPreviousLaunches } = usePreviousLaunches();
  const { isLoading: isLoadingArticles } = useArticles();

  const isLoadingQueries = isLoading || isLoadingPreviousLaunches || isLoadingArticles;

  const [isFontsLoaded] = useFonts({
    Inter: require('../../assets/fonts/Inter-Regular.otf'),
    'Inter-Light': require('../../assets/fonts/Inter-Light.otf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.otf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.otf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.otf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.otf'),
  });

  const [fetchedRemoteConfig, setFetchedRemoteConfig] = useState(false);
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false);

  const handleNavigate = useCallback(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace(isUnderMaintenance ? 'maintenance' : 'home'));
    }, 2500);
  }, [isUnderMaintenance, navigation]);

  const fetchRemoteData = useCallback(async () => {
    try {
      await RemoteConfig.initialize();
      const maintenance = JSON.parse(RemoteConfig.getRemoteValue('under_maintenance').asString());
      setIsUnderMaintenance(maintenance.active);
    } catch (error) {
      Logger.error(error);
    } finally {
      setFetchedRemoteConfig(true);
    }
  }, []);

  useEffect(() => {
    fetchRemoteData();
  }, [fetchRemoteData]);

  useEffect(() => {
    if (isFontsLoaded && fetchedRemoteConfig && !isLoadingQueries) {
      handleNavigate();
    }
  }, [fetchedRemoteConfig, handleNavigate, isFontsLoaded, isLoadingQueries]);

  useEffect(() => {
    const timetout = setTimeout(() => {
      navigation.dispatch(StackActions.replace('maintenance'));
    }, 15000);

    return () => {
      clearTimeout(timetout);
    };
  }, [navigation]);

  return (
    <View className="bg-dark flex-1 items-center justify-center">
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </View>
  );
};
