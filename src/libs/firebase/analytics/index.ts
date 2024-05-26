import { analyticsService } from '@libs/amplitude';
import { Logger } from '@libs/logger';
import { useCallback } from 'react';

export function useAnalytics() {
  const logEvent = useCallback(async (name: string, params?: Record<string, any>) => {
    try {
      await analyticsService.logEvent(name, params);
    } catch (error) {
      Logger.error({
        domain: 'Analytics',
        error,
        name: 'AnalyticsLogEventError',
        severity: 'warning',
      });
    }
  }, []);

  return { logEvent };
}
