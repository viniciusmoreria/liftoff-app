import React from 'react';

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Atoms from '@components/atoms';
import { useBottomSheet } from '@hooks/index';
import { isNameValid } from '@utils/helpers';

function ChangeNameSheet({
  onChangeName,
}: {
  onChangeName: (name: string) => void;
}) {
  const { closeSheet } = useBottomSheet();

  const [name, setName] = React.useState('');

  const handleSubmitName = React.useCallback(async () => {
    await AsyncStorage.setItem('name', name.trim());
    onChangeName(name.trim());
    setName('');
    closeSheet();
  }, [closeSheet, name, onChangeName]);

  return (
    <Atoms.Box sx={{ pt: '12px', pb: '42px' }}>
      <Atoms.Text variant="text-xl" sx={{ color: 'white', fontWeight: 'bold' }}>
        What you would like to be called?
      </Atoms.Text>

      <Atoms.Box sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCompleteType="name"
          textContentType="name"
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1.6,
            marginTop: 38,
            marginBottom: 52,
            width: '100%',
            height: 48,
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
          }}
        />

        <Atoms.Pressable
          onPress={handleSubmitName}
          disabled={!isNameValid.test(name)}
          sx={{
            opacity: isNameValid.test(name) ? 1 : 0.5,
            bg: 'secondary',
            width: '100%',
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            mb: 40,
          }}
        >
          <Atoms.Text
            variant="text-sm"
            sx={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Confirm
          </Atoms.Text>
        </Atoms.Pressable>
      </Atoms.Box>
    </Atoms.Box>
  );
}

export { ChangeNameSheet };
