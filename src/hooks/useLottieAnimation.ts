import { useRef, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import type LottieView from 'lottie-react-native';

export function useLottieAnimation() {
  const animation = useRef<LottieView>(null);

  useFocusEffect(
    useCallback(() => {
      if (animation.current) {
        setTimeout(() => {
          animation.current?.reset();
          animation.current?.play();
        }, 100);
      }

      return () => {
        // eslint-disable-next-line no-unused-expressions
        animation.current && animation.current.reset();
      };
    }, []),
  );

  return animation;
}
