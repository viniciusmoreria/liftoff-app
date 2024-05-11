import { Sentry, SentryTypes } from '@libs/sentry';
import { Platform } from 'react-native';

import { DomainError, ErrorName } from './types';

class LoggableError extends Error {
  constructor(domain: DomainError, name: ErrorName, cause: Error) {
    const message = `${cause.name}: ${cause.message}`;

    super(message);
    this.name = `${domain} - ${name}`;
    this.stack = cause.stack ?? message;

    Object.setPrototypeOf(this, LoggableError.prototype);
  }
}

export const isLoggableError = (value: unknown): value is LoggableError =>
  value instanceof LoggableError;

const isError = (value: unknown): value is Error =>
  !!value &&
  typeof value === 'object' &&
  'message' in value &&
  typeof value.message === 'string' &&
  'stack' in value &&
  typeof value.stack === 'string';

export const createLoggableError = (domain: DomainError, name: ErrorName, cause: unknown) => {
  if (cause instanceof LoggableError) {
    return cause;
  }

  if (!isError(cause)) {
    try {
      const normalizedCause = new Error(
        `Non-error value thrown: ${
          typeof cause === 'object' ? JSON.stringify(cause) : String(cause)
        }`
      );
      return new LoggableError(domain, name, normalizedCause);
    } catch {
      const normalizedCause = new Error(`Non-stringifiable value thrown`);
      return new LoggableError(domain, name, normalizedCause);
    }
  }

  return new LoggableError(domain, name, cause);
};

export const Logger = {
  log: (...args: any) => {
    if (__DEV__) {
      console.log(...args);
    }
  },

  error: ({
    domain,
    name,
    error,
    severity,
    extra,
  }: {
    domain: DomainError;
    name: ErrorName;
    error: unknown;
    severity: SentryTypes.SeverityLevel;
    extra?: string | Record<string, string>;
  }) => {
    const loggableError = createLoggableError(domain, name, error);

    if (__DEV__) {
      console.error('[DEBUG]:', loggableError);
      return;
    }

    const CONTEXT_APP_DOMAIN_TITLE = 'App Domain';

    Sentry.withScope((scope) => {
      scope.setLevel(severity);

      Sentry.setContext(CONTEXT_APP_DOMAIN_TITLE, {
        name: domain,
        error: name,
      });

      scope.setFingerprint([domain, name, String(error)]);

      scope.setTags({
        domain,
        error_name: name,
        device_platform: Platform.OS,
      });

      if (extra) {
        if (typeof extra === 'string') {
          scope.setExtra(`${domain}_${name}`, extra);
        } else {
          scope.setExtras(extra);
        }
      }

      Sentry.captureException(loggableError);
    });
  },
};
