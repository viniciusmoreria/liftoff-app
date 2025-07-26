import { LoadingAnimation } from '@assets/animations';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export const SplashScreen = () => {
  return (
    <Animated.View exiting={FadeOut} style={styles.container}>
      <LottieView style={styles.lottie} source={LoadingAnimation} autoPlay loop />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
    ...StyleSheet.absoluteFillObject,
  },
  lottie: {
    width: 50,
    height: 50,
  },
});
