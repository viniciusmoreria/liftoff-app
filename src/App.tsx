import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

import Routes from './routes';
import theme from './styles/theme';

const config = {
  dependencies: {
    // eslint-disable-next-line global-require
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme} config={config}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
