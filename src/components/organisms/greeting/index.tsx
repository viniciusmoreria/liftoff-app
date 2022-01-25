import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Atoms from '@components/atoms';
import withAnimation from '@components/withAnimation';
import { useBottomSheet } from '@hooks/index';
import { greet } from '@utils/helpers';

import { ChangeNameSheet } from '../changenamesheet';

function Greeting() {
  const { setSheetContent } = useBottomSheet();

  const [storedName, setStoredName] = React.useState('');

  React.useLayoutEffect(() => {
    async function getName() {
      const username = await AsyncStorage.getItem('name');

      if (username) {
        setStoredName(username);
      }
    }

    getName();
  }, []);

  return (
    <Atoms.Box sx={{ pl: '24px', mt: '42px', mb: '16px' }}>
      <Atoms.Text variant="text-xl" sx={{ color: 'white', fontWeight: 500 }}>
        {greet()},
      </Atoms.Text>

      <Atoms.Box sx={{ alignSelf: 'flex-start' }}>
        <Atoms.Pressable
          onPress={() =>
            setSheetContent({
              content: <ChangeNameSheet onChangeName={setStoredName} />,
            })
          }
        >
          <Atoms.Text
            variant="text-xl"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mt: '3px',
            }}
          >
            {storedName || 'crew member'}
          </Atoms.Text>

          <Atoms.Box
            sx={{
              borderColor: 'accent',
              borderStyle: 'dotted',
              borderWidth: storedName ? 0 : 1,
              mt: '3px',
            }}
          />
        </Atoms.Pressable>
      </Atoms.Box>
    </Atoms.Box>
  );
}

const GreetingWithAnimation = withAnimation(Greeting);

export { GreetingWithAnimation as Greeting };
