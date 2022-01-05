import React from 'react';

import { format, fromUnixTime } from 'date-fns';

import * as Atoms from '@components/atoms';

function LaunchDate({ unixTime }: { unixTime: number }) {
  return (
    <Atoms.Text
      variant="text-xs"
      sx={{ color: 'primary', fontSize: 9, fontWeight: 500 }}
    >
      {format(fromUnixTime(unixTime), 'HH:mm ')}
      {format(fromUnixTime(unixTime), 'O')}
    </Atoms.Text>
  );
}

export { LaunchDate };
