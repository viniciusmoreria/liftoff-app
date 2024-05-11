export type DomainError = 'Launches' | 'Error-Boundary' | 'React-Query' | 'Startup' | 'Analytics';

export type ErrorName =
  | 'FetchUpcomingLaunchesError'
  | 'FetchPastLaunchesError'
  | 'FetchLaunchError'
  | 'ErrorBoundaryCrash'
  | 'QueryRequestError'
  | 'FirebaseSignInError'
  | 'AnalyticsLogEventErro';
