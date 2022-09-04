import { Sentry } from '@libs/sentry';

export const Logger = {
  log: (...args: any) => {
    if (__DEV__) {
      console.log(...args);
    }
  },

  error: (...args: any) => {
    if (__DEV__) {
      console.error(...args);
    }
    Sentry.Native.captureException(args);
  },
};
