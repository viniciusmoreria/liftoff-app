import React from 'react';

import * as Atoms from '@components/atoms';
import { useDate } from '@hooks/index';
import { getTMinus, LaunchStageType } from '@utils/helpers';

import { TimerDivider } from '../../molecules/timerdivider';
import { TimerDoubleDigit } from '../../molecules/timerdoubledigit';

function Timer({
  launchDate,
  stage,
}: {
  launchDate: Date;
  stage: LaunchStageType;
}) {
  const date = useDate({
    date: launchDate,
  });

  const { days, hours, minutes, seconds } = getTMinus(date);

  return (
    <Atoms.Box>
      {Number(days) >= 1 && stage !== 'T-Plus' ? (
        <Atoms.Row sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <TimerDoubleDigit
            digits={days}
            label={Number(days) > 1 ? 'days' : 'day'}
          />
          <TimerDivider />
          <TimerDoubleDigit
            digits={hours}
            label={Number(hours) > 1 ? 'hours' : 'hour'}
          />
        </Atoms.Row>
      ) : (
        <Atoms.Row>
          {Number(hours) >= 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDoubleDigit
                digits={hours}
                label={Number(hours) > 1 ? 'hours' : 'hour'}
              />
              <TimerDivider />
            </Atoms.Row>
          )}
          <TimerDoubleDigit
            digits={minutes}
            label={Number(minutes) > 1 ? 'mins' : 'min'}
          />
          {Number(hours) < 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDivider />
              <TimerDoubleDigit
                digits={seconds}
                label={Number(seconds) > 1 ? 'secs' : 'sec'}
              />
            </Atoms.Row>
          )}
        </Atoms.Row>
      )}
    </Atoms.Box>
  );
}

export { Timer };
