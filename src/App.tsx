import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DripsyProvider } from 'dripsy';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';

import { BottomSheetProvider, useAppState } from './hooks';
import { Routes } from './routes';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

export default function App() {
  const { justBecameActive } = useAppState();

  React.useEffect(() => {
    focusManager.setFocused(justBecameActive);
  }, [justBecameActive]);

  return (
    <QueryClientProvider client={queryClient}>
      <DripsyProvider theme={theme}>
        <NavigationContainer>
          <BottomSheetProvider>
            <Routes />
          </BottomSheetProvider>
        </NavigationContainer>
      </DripsyProvider>
    </QueryClientProvider>
  );
}
