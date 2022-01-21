import React, { ComponentProps } from 'react';

import { View, Box } from 'dripsy';

type CardProps = ComponentProps<typeof View>;

function Card({ children, sx }: CardProps) {
  return (
    <Box
      sx={{
        bg: 'secondary',
        p: '16px',
        mr: '16px',
        mt: '24px',
        width: '100%',
        borderRadius: 8,
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export { Card };
