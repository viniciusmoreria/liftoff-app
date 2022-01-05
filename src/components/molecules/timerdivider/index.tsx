import React from 'react';

import * as Atoms from '@components/atoms';

function TimerDivider() {
  return (
    <Atoms.Text
      variant="text-xl"
      sx={{ color: 'primary', fontWeight: 'bold', mb: 14, ml: '3px' }}
    >
      :
    </Atoms.Text>
  );
}

export { TimerDivider };
