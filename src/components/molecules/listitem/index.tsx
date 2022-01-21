import React from 'react';

import * as Atoms from '@components/atoms';

function ListItem({
  title,
  value,
  capitalize,
}: {
  title: string;
  value: string | number | undefined;
  capitalize?: boolean;
}) {
  return (
    <Atoms.Row sx={{ mt: '19px', justifyContent: 'space-between' }}>
      <Atoms.Text
        variant="text-xs"
        sx={{
          color: 'primary',
          fontSize: 10,
        }}
      >
        {title}
      </Atoms.Text>

      <Atoms.Text
        variant="text-xs"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 10,
          textTransform: capitalize ? 'capitalize' : 'none',
        }}
      >
        {value ?? '-'}
      </Atoms.Text>
    </Atoms.Row>
  );
}

export { ListItem };
