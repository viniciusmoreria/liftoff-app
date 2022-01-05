import React, { FC } from 'react';

import { AnimatedBox } from './atoms';

const withAnimatedBox = (Component: FC, delay: number) => () => {
  return (
    <AnimatedBox delay={delay}>
      <Component />
    </AnimatedBox>
  );
};

export default withAnimatedBox;
