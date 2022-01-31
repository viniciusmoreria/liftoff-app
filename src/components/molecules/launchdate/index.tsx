import React from 'react';

import { format } from 'date-fns';
import { utcToZonedTime, format as formatTz } from 'date-fns-tz';

import * as Atoms from '@components/atoms';

function LaunchDate({
  date,
  showLocalTime,
  timezone,
}: {
  date: Date;
  showLocalTime?: boolean;
  timezone?: string;
}) {
  const getLocalTime = React.useCallback(() => {
    if (showLocalTime && timezone) {
      const localTime = utcToZonedTime(new Date(date), timezone);
      const pattern = 'HH:mm';
      const output = formatTz(localTime, pattern, { timeZone: timezone });

      return output;
    }

    return '';
  }, [date, showLocalTime, timezone]);

  return (
    <Atoms.Text
      variant="text-xs"
      sx={{ color: 'primary', fontSize: 9, fontWeight: 500 }}
    >
      {showLocalTime ? (
        <>
          {getLocalTime()} Local ({format(new Date(date), 'iii ')}
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
