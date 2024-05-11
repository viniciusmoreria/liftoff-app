import React, { useCallback, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

type Props = {
  height: number;
  backgroundColor: string;
  trackColor?: string;
};

export const AnimatedProgressBar = ({ backgroundColor, height, trackColor }: Props) => {
  const [timer] = useState(new Animated.Value(0));

  const indeterminateAnimation = Animated.timing(timer, {
    duration: 3000,
    toValue: 1,
    useNativeDriver: true,
    isInteraction: false,
  });

  const styleAnimation = () => {
    return {
      transform: [
        {
          translateX: timer.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-0.6 * 320, -0.5 * 0.8 * 320, 0.7 * 320],
          }),
        },
        {
          scaleX: timer.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.0001, 0.8, 0.0001],
          }),
        },
      ],
    };
  };

  const startAnimation = useCallback(() => {
    timer.setValue(0);
    Animated.loop(indeterminateAnimation).start();
  }, [indeterminateAnimation, timer]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: trackColor, height }]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            backgroundColor,
            borderRadius: height / 2,
            ...styleAnimation(),
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
  },
  progressBar: {
    flex: 1,
  },
});
