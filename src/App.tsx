import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import { NativeBaseProvider } from 'native-base';

import Routes from './routes';
import theme from './styles/theme';

export default function App() {
  React.useEffect(() => {
    async function updateApp() {
      if (!__DEV__) {
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          await Updates.fetchUpdateAsync();

          await Updates.reloadAsync();
        }
      }
    }

    updateApp();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
