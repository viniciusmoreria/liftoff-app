import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { LoadingAnimation } from '@assets/animations';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { RemoteConfig } from '@libs/firebase/remote-config';
import { Logger } from '@libs/logger';
import { RootStackParams } from '@navigation/types';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<RootStackParams, 'splash'>;

export const SplashScreen = ({ navigation }: Props) => {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
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
    if (isFontsLoaded && fetchedRemoteConfig) {
      handleNavigate();
    }
  }, [fetchedRemoteConfig, handleNavigate, isFontsLoaded]);

  return (
    <View className="bg-dark flex-1 items-center justify-center">
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </View>
  );
};
