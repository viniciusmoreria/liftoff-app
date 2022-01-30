import React from 'react';

import * as Atoms from '@components/atoms';
import DeviceUtils from '@utils/DeviceUtils';

function TimerDoubleDigit({
  digits,
  label,
}: {
  digits: string;
  label: string;
}) {
  return (
    <Atoms.Box>
      <Atoms.Row>
        {digits.split('').map((digit, index) => (
          <Atoms.Center
            key={index.toString()}
            sx={{
              height: DeviceUtils.isTinyPhone ? 39 : 44,
              width: DeviceUtils.isTinyPhone ? 25 : 30,
              bg: 'secondary',
              px: '6px',
              borderRadius: 4,
              ml: '3px',
            }}
          >
            <Atoms.Text
              variant={DeviceUtils.isTinyPhone ? 'text-sm' : 'text-xl'}
              sx={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {digit}
            </Atoms.Text>
          </Atoms.Center>
        ))}
      </Atoms.Row>

      <Atoms.Text
        variant="text-xs"
        sx={{
          color: 'primary',
          fontWeight: 500,
          mt: '3px',
          ml: '4px',
        }}
      >
        {label}
      </Atoms.Text>
    </Atoms.Box>
  );
}

export { TimerDoubleDigit };
