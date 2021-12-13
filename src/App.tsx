import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
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
