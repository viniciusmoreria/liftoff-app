import { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { LoadingAnimation } from '@assets/animations';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { RootStackParams } from '@navigation/types';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<RootStackParams, 'splash'>;

const SplashScreen = ({ navigation }: Props) => {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleNavigateToHome = useCallback(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('home'));
    }, 2500);
  }, [navigation]);

  useEffect(() => {
    if (isFontsLoaded) {
      handleNavigateToHome();
    }
  }, [handleNavigateToHome, isFontsLoaded]);

  return (
    <View className="bg-dark flex-1 items-center justify-center">
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </View>
  );
};

export { SplashScreen };
