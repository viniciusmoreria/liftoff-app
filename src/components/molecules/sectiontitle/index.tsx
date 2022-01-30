import React from 'react';

import * as Atoms from '@components/atoms';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

function SectionTitle({ title, subtitle, onPress }: SectionTitleProps) {
  return (
    <Atoms.Row
      sx={{
        flex: 1,
        pr: '24px',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: '10px',
      }}
    >
      <Atoms.Text variant="text-sm" sx={{ color: 'white', fontWeight: 'bold' }}>
        {title}
      </Atoms.Text>

      <Atoms.Pressable onPress={onPress} hitSlop={20}>
        <Atoms.Text
          variant="text-xs"
          sx={{ color: 'white', fontWeight: 'bold' }}
        >
          {subtitle}
        </Atoms.Text>
      </Atoms.Pressable>
    </Atoms.Row>
  );
}

export { SectionTitle };
