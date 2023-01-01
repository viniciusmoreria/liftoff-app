import { useCallback } from 'react';

import { analyticsService } from '@libs/amplitude/analytics';
import { Logger } from '@libs/logger';
import analytics from '@react-native-firebase/analytics';

export function useAnalytics() {
  const logEvent = useCallback(async (name: string, params?: Record<string, any>) => {
    try {
      await analytics().logEvent(name, params);
      await analyticsService.logEvent(name, params);
    } catch (error) {
      Logger.error(error);
    }
  }, []);

  return { logEvent };
}
