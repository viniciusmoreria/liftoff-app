import React, { ComponentProps } from 'react';

import { Pressable, Text, SxProp, DripsyVariant } from 'dripsy';

type ButtonProps = ComponentProps<typeof Pressable> & {
  title: string;
  textVariant?: DripsyVariant<'text'>;
  textProps?: SxProp;
};

function Button(props: ButtonProps) {
  const { onPress, title, textVariant, textProps, sx, ...rest } = props;

  return (
    <Pressable
      onPress={onPress}
      sx={{
        flex: 1,
        bg: 'accent',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        ...sx,
      }}
      {...rest}
    >
      <Text
        variant={textVariant}
        sx={{
          color: 'white',
          fontWeight: 'bold',
          ...textProps,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export { Button };
