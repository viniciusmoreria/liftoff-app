import React from 'react';

import { format } from 'date-fns';

import * as Atoms from '@components/atoms';

function LaunchDate({ date }: { date: Date }) {
  return (
    <Atoms.Text
      variant="text-xs"
      sx={{ color: 'primary', fontSize: 9, fontWeight: 500 }}
    >
      {format(new Date(date), 'HH:mm ')}
      {format(new Date(date), 'O')}
    </Atoms.Text>
  );
}

export { LaunchDate };
