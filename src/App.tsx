import React from 'react';

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
        <BottomSheetProvider>
          <Routes />
        </BottomSheetProvider>
      </DripsyProvider>
    </QueryClientProvider>
  );
}
