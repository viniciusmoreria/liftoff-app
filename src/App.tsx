import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';

import useAppState from '@hooks/useAppState';

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
  const { justBecameActive } = useAppState();

  React.useEffect(() => {
    focusManager.setFocused(justBecameActive);
  }, [justBecameActive]);

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
