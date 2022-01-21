import React, { FC } from 'react';

import Animated, { FadeInDown } from 'react-native-reanimated';

const withAnimation =
  (Component: FC, delay = 400) =>
  () => {
    return (
      <Animated.View entering={FadeInDown.delay(delay - 100).duration(delay)}>
        <Component />
      </Animated.View>
    );
  };

export default withAnimation;
