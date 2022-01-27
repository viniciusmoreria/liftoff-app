import React from 'react';

import LottieView from 'lottie-react-native';

import { LoadingAnimation } from '@assets/animations';
import * as Atoms from '@components/atoms';
import { useLottieAnimation } from '@hooks/useLottieAnimation';

function Loading() {
  const animation = useLottieAnimation();

  return (
    <Atoms.Center sx={{ flex: 1 }}>
      <LottieView
        ref={animation}
        source={LoadingAnimation}
        autoPlay
        style={{ width: 50 }}
      />
    </Atoms.Center>
  );
}

export { Loading };
