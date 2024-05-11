import { analyticsService } from '@libs/amplitude';
import { Logger } from '@libs/logger';
import analytics from '@react-native-firebase/analytics';
import { useCallback } from 'react';

export function useAnalytics() {
  const logEvent = useCallback(async (name: string, params?: Record<string, any>) => {
    try {
      await analytics().logEvent(name, params);
      await analyticsService.logEvent(name, params);
    } catch (error) {
      Logger.error({
        domain: 'Analytics',
        error,
        name: 'AnalyticsLogEventErro',
        severity: 'warning',
      });
    }
  }, []);

  return { logEvent };
}
