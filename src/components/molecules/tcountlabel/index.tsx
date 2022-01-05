import React from 'react';

import * as Atoms from '@components/atoms';

function TCountLabel({ isTPlusStage }: { isTPlusStage: boolean }) {
  return (
    <Atoms.Box
      sx={{
        alignSelf: 'flex-start',
        borderBottomColor: isTPlusStage ? 'green' : 'accent',
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
        {isTPlusStage ? 'T-Plus' : 'T-Minus'}
      </Atoms.Text>
    </Atoms.Box>
  );
}

export { TCountLabel };
