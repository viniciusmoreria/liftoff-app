import { useEffect } from 'react';
import { View } from 'react-native';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { StackActions, useNavigation } from '@react-navigation/native';
import { tw } from '@styles/twrnc';
import LottieView from 'lottie-react-native';

import { LoadingAnimation } from '../../assets/animations';

const SplashScreen = () => {
  const { dispatch } = useNavigation();

  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (isFontsLoaded) {
      setTimeout(() => {
        dispatch(StackActions.replace('home'));
      }, 2500);
    }
  }, [dispatch, isFontsLoaded]);

  return (
    <View style={tw`flex-1 bg-dark items-center justify-center`}>
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </View>
  );
};

export { SplashScreen };
