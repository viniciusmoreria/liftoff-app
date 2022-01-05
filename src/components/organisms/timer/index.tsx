import React from 'react';

import { fromUnixTime, isAfter } from 'date-fns';

import * as Atoms from '@components/atoms';
import { useDate } from '@hooks/index';
import { getTMinus } from '@utils/helpers';

import { TimerDivider } from '../../molecules/timerdivider';
import { TimerDoubleDigit } from '../../molecules/timerdoubledigit';

function Timer({ unixTime }: { unixTime: number }) {
  const date = useDate({
    date: fromUnixTime(unixTime),
  });
  const tMinus = getTMinus(date);
  const isTPlusStage = isAfter(new Date(), fromUnixTime(unixTime));

  return (
    <Atoms.Box>
      {Number(tMinus.days) >= 1 && !isTPlusStage ? (
        <Atoms.Row sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <TimerDoubleDigit digits={tMinus.days} label="days" />
          <TimerDivider />
          <TimerDoubleDigit digits={tMinus.hours} label="hours" />
        </Atoms.Row>
      ) : (
        <Atoms.Row>
          {Number(tMinus.hours) >= 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDoubleDigit
                digits={tMinus.hours}
                label={Number(tMinus.hours) > 1 ? 'hours' : 'hour'}
              />
              <TimerDivider />
            </Atoms.Row>
          )}
          <TimerDoubleDigit digits={tMinus.minutes} label="mins" />
          {Number(tMinus.hours) < 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDivider />
              <TimerDoubleDigit digits={tMinus.seconds} label="secs" />
            </Atoms.Row>
          )}
        </Atoms.Row>
      )}
    </Atoms.Box>
  );
}

export { Timer };
