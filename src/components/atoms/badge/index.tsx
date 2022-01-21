import React, { ComponentProps } from 'react';

import { Box, View } from 'dripsy';

type BadgeProps = ComponentProps<typeof View>;

function Badge({ children, sx }: BadgeProps) {
  return (
    <Box
      sx={{
        bg: 'background',
        px: 6,
        py: 3.5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 25,
        minHeight: 20,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export { Badge };
