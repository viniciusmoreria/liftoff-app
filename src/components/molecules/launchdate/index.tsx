import React from 'react';

import { format } from 'date-fns';

import * as Atoms from '@components/atoms';

function LaunchDate({
  date,
  showLocalTime,
}: {
  date: Date;
  showLocalTime?: boolean;
}) {
  return (
    <Atoms.Text
      variant="text-xs"
      sx={{ color: 'primary', fontSize: 9, fontWeight: 500 }}
    >
      {showLocalTime ? (
        <>
          {String(date).slice(11, 16)} Local ({format(new Date(date), 'iii ')}
          {format(new Date(date), 'HH:mm ')}
          {format(new Date(date), 'O')})
        </>
      ) : (
        <>
          {format(new Date(date), 'HH:mm ')}
          {format(new Date(date), 'O')}
        </>
      )}
    </Atoms.Text>
  );
}

export { LaunchDate };
