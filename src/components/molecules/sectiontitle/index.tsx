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
      sx={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Atoms.Text variant="text-sm" sx={{ color: 'white', fontWeight: 'bold' }}>
        {title}
      </Atoms.Text>

      <Atoms.Pressable onPress={onPress}>
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
