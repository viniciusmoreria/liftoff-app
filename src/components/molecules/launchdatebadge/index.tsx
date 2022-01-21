import React from 'react';

import { format } from 'date-fns';

import * as Atoms from '@components/atoms';
import type { LaunchProps } from '@types';

function LaunchDateBadge({ launch }: { launch: LaunchProps }) {
  const isPendingConfirmation =
    launch.date_precision !== 'hour' && launch.date_precision !== 'day';

  return (
    <Atoms.Badge sx={{ px: 8 }}>
      {isPendingConfirmation ? (
        <Atoms.Center>
          <Atoms.Text
            variant="text-xs"
            sx={{
              color: 'white',
              fontSize: 9,
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            {format(new Date(launch.date_local), 'Y')}
          </Atoms.Text>
        </Atoms.Center>
      ) : (
        <Atoms.Center>
          <Atoms.Text
            sx={{
              color: 'primary',
              fontSize: 8,
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            {format(new Date(launch.date_local), 'MMM')}
          </Atoms.Text>

          <Atoms.Text
            sx={{
              color: 'white',
              fontSize: 9,
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            {format(new Date(launch.date_local), 'd')}
          </Atoms.Text>
        </Atoms.Center>
      )}
    </Atoms.Badge>
  );
}

export { LaunchDateBadge };
