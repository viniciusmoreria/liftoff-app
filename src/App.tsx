import React from 'react';

import { DripsyProvider } from 'dripsy';
import { AppStateStatus, Platform } from 'react-native';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';

import { BottomSheetProvider, useAppState, useOnlineManager } from './hooks';
import { Routes } from './routes';
import { theme } from './styles/theme';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

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
