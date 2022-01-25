import { useEffect } from 'react';

import { AppState, AppStateStatus } from 'react-native';

/**
 * "Use the AppState module to listen for changes in the app's state."
 * @param onChange - (status: AppStateStatus) => void
 */
export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    AppState.addEventListener('change', onChange);

    return () => {
      AppState.removeEventListener('change', onChange);
    };
  }, [onChange]);
}
