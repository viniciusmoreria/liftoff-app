import { LoadingAnimation } from '@assets/animations';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { StyleSheet, View } from 'react-native';
import { Skottie } from 'react-native-skottie';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Skottie style={styles.lottie} source={LoadingAnimation} autoPlay />
    </View>
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
