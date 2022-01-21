import React from 'react';

import * as Atoms from '@components/atoms';
import type { LaunchStageType } from '@utils/helpers';

const getLaunchColor = {
  'T-Minus': 'accent',
  Liftoff: 'orange',
  'T-Plus': 'green',
};

function TCountLabel({ stage }: { stage: LaunchStageType }) {
  return (
    <Atoms.Box
      sx={{
        alignSelf: 'flex-start',
        borderBottomColor: getLaunchColor[stage],
        borderBottomWidth: 2,
      }}
    >
      <Atoms.Text
        variant="text-xs"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          lineHeight: 22,
        }}
      >
        {stage}
      </Atoms.Text>
    </Atoms.Box>
  );
}

export { TCountLabel };
