import React, { ComponentProps } from 'react';

import { View } from 'dripsy';

type CenterProps = ComponentProps<typeof View>;

function Center(props: CenterProps) {
  const { children, sx, ...rest } = props;

  return (
    <View
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'background',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </View>
  );
}

export { Center };
