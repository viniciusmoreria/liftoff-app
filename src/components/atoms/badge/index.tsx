import React, { ComponentProps } from 'react';

import { Box } from 'dripsy';
import { View } from 'dripsy';

type BadgeProps = ComponentProps<typeof View>;

function Badge({ children, sx }: BadgeProps) {
  return (
    <Box sx={{ bg: 'background', px: 6, py: 3.5, borderRadius: 4, ...sx }}>
      {children}
    </Box>
  );
}

export { Badge };
