export type DomainError =
  | 'Launches'
  | 'Error-Boundary'
  | 'React-Query'
  | 'Startup'
  | 'Analytics'
  | 'Subscriptions';

export type ErrorName =
  | 'FetchUpcomingLaunchesError'
  | 'FetchPastLaunchesError'
  | 'FetchLaunchError'
  | 'ErrorBoundaryCrash'
  | 'QueryRequestError'
  | 'FirebaseSignInError'
  | 'AnalyticsLogEventError'
  | 'PurchasePackagesError';
