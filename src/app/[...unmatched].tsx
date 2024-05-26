import { SpaceManAnimation } from '@assets/animations';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Skottie } from 'react-native-skottie';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Skottie source={SpaceManAnimation} autoPlay style={styles.lottie} loop />

      <Animated.View entering={FadeIn} style={styles.animatedContainer}>
        <Text style={styles.text}>Seem like you aren't on earth</Text>

        <Pressable style={styles.button} onPress={() => router.navigate('/')}>
          <Text style={styles.buttonText}>Take me home</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    rowGap: spacing.md,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.background,
  },
});
