import React from 'react';

import * as Atoms from '@components/atoms';
import type { LaunchStageType } from '@utils/helpers';

import { TimerDivider } from '../timerdivider';
import { TimerDoubleDigit } from '../timerdoubledigit';

function Timer({
  tMinus,
  stage,
}: {
  tMinus: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  stage: LaunchStageType;
}) {
  const { days, hours, minutes, seconds } = tMinus;

  return (
    <Atoms.Box>
      {Number(days) >= 1 && stage !== 'T-Plus' ? (
        <Atoms.Row sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <TimerDoubleDigit
            digits={days}
            label={Number(days) > 1 ? 'days' : 'day'}
          />
          <TimerDivider />
          <TimerDoubleDigit digits={hours} label="hours" />
        </Atoms.Row>
      ) : (
        <Atoms.Row>
          {Number(hours) >= 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDoubleDigit digits={hours} label="hours" />
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
