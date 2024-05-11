import { Logger } from '@libs/logger';
import { QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        Logger.error({
          domain: 'React-Query',
          error,
          name: 'QueryRequestError',
          severity: 'error',
        });
      }
    },
  }),
});
