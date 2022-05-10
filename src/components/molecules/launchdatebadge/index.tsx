import React from 'react';

import { format } from 'date-fns';

import * as Atoms from '@components/atoms';
import type { LaunchProps } from '@types';

function LaunchDateBadge({ launch }: { launch: LaunchProps }) {
  const isPendingConfirmation =
    launch.date_precision !== 'hour' && launch.date_precision !== 'day';

  return (
    <Atoms.Box sx={{ width: 65 }}>
      {isPendingConfirmation ? (
        <Atoms.Center sx={{ bg: 'transparent' }}>
          <Atoms.Text
            variant="text-xs"
            sx={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {format(new Date(launch.date_local), 'Y')}
          </Atoms.Text>

          <Atoms.Text
            sx={{
              color: 'primary',
              fontSize: 9,
              fontWeight: 500,
              mt: '3px',
            }}
          >
            Date pending
          </Atoms.Text>
        </Atoms.Center>
      ) : (
        <Atoms.Center sx={{ bg: 'transparent' }}>
          <Atoms.Text
            variant="text-sm"
            sx={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {format(new Date(launch.date_local), 'HH:mm ')}
          </Atoms.Text>

          <Atoms.Text
            variant="text-sm"
            sx={{
              textAlign: 'center',

              color: 'primary',
              fontSize: 9,
              fontWeight: 500,
              mt: '3px',
            }}
          >
            {format(new Date(launch.date_local), 'MMM do')}
          </Atoms.Text>
        </Atoms.Center>
      )}
    </Atoms.Box>
  );
}

export { LaunchDateBadge };
