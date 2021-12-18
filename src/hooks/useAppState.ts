import React from 'react';

import { AppState, AppStateStatus } from 'react-native';

import usePrevious from './usePrevious';

const AppStateTypes = {
  active: 'active',
  background: 'background',
  inactive: 'inactive',
};

interface UseAppStateProps {
  appState: AppStateStatus;
  justBecameActive: boolean | undefined;
}

export default function useAppState(): UseAppStateProps {
  const [appState, setAppState] = React.useState(AppState.currentState);
  const prevAppState = usePrevious(appState);

  function onChange(newState: AppStateStatus) {
    setAppState(newState);
  }

  React.useEffect(() => {
    AppState.addEventListener('change', onChange);
    return () => AppState.removeEventListener('change', onChange);
  }, []);

  return {
    appState,
    justBecameActive:
      appState === AppStateTypes.active &&
      prevAppState &&
      prevAppState !== AppStateTypes.active,
  };
}
