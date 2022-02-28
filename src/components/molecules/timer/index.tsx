import React from 'react';

import { useIntl } from 'react-intl';

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

  const { formatMessage } = useIntl();

  return (
    <Atoms.Box>
      {Number(days) >= 1 && stage !== 'T-Plus' ? (
        <Atoms.Row sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <TimerDoubleDigit
            digits={days}
            label={
              Number(days) > 1
                ? formatMessage({ id: 'LABELS.DAYS' })
                : formatMessage({ id: 'LABELS.DAY' })
            }
          />
          <TimerDivider />
          <TimerDoubleDigit
            digits={hours}
            label={formatMessage({ id: 'LABELS.HOURS' })}
          />
        </Atoms.Row>
      ) : (
        <Atoms.Row>
          {Number(hours) >= 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDoubleDigit
                digits={hours}
                label={formatMessage({ id: 'LABELS.HOURS' })}
              />
              <TimerDivider />
            </Atoms.Row>
          )}
          <TimerDoubleDigit
            digits={minutes}
            label={
              Number(minutes) > 1
                ? formatMessage({ id: 'LABELS.MINUTES' })
                : formatMessage({ id: 'LABELS.MINUTE' })
            }
          />
          {Number(hours) < 1 && (
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <TimerDivider />
              <TimerDoubleDigit
                digits={seconds}
                label={
                  Number(seconds) > 1
                    ? formatMessage({ id: 'LABELS.SECONDS' })
                    : formatMessage({ id: 'LABELS.SECOND' })
                }
              />
            </Atoms.Row>
          )}
        </Atoms.Row>
      )}
    </Atoms.Box>
  );
}

export { Timer };
