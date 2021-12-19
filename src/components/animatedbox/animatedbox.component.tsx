import React from 'react';

import { MotiView } from 'moti';

export default function AnimatedBox({
  children,
  delay = 350,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: delay,
        scale: {
          type: 'spring',
          delay: 100 + delay,
        },
      }}
    >
      {children}
    </MotiView>
  );
}
