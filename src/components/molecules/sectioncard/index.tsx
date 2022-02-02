import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import * as Atoms from '@components/atoms';

type SectionCardProps = {
  title: string;
  onPress?: () => void;
  clean?: boolean;
  unavailable?: boolean;
};

function SectionCard({ title, onPress, clean, unavailable }: SectionCardProps) {
  return (
    <Atoms.Pressable
      onPress={onPress}
      disabled={unavailable}
      {...(clean && {
        sx: {
          mt: clean ? '30px' : 0,
        },
        hitSlop: 10,
      })}
    >
      <Atoms.Card sx={clean ? { bg: 'transparent', p: 0, mt: 0 } : {}}>
        <Atoms.Row
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Atoms.Text
            variant="text-xs"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              opacity: unavailable ? 0.5 : 1,
            }}
          >
            {title}
          </Atoms.Text>

          {unavailable ? (
            <Atoms.Badge sx={{ bg: 'secondary' }}>
              <Atoms.Text
                variant="text-xs"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Soon
              </Atoms.Text>
            </Atoms.Badge>
          ) : (
            <Ionicons name="chevron-forward" color="white" size={18} />
          )}
        </Atoms.Row>
      </Atoms.Card>
    </Atoms.Pressable>
  );
}

export { SectionCard };
