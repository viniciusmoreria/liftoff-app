import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as Atoms from '@components/atoms';

function Header() {
  const { goBack } = useNavigation();

  return (
    <Atoms.Pressable onPress={() => goBack()}>
      <Atoms.Row
        sx={{
          mt: '36px',
        }}
      >
        <Atoms.Badge
          sx={{
            bg: 'secondary',
            borderRadius: 8,
          }}
        >
          <Ionicons name="chevron-back" color="white" size={22} />
        </Atoms.Badge>
      </Atoms.Row>
    </Atoms.Pressable>
  );
}

export { Header };
