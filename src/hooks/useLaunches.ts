import { useQuery } from 'react-query';

import { spacexApi } from '@config/api';
import type { LaunchProps, LaunchPaginationProps } from '@types';

const getUpcomingLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await spacexApi.post<LaunchPaginationProps>(
    '/launches/query',
    {
      query: {
        upcoming: true,
      },
      options: {
        pagination: false,
        sort: {
          flight_number: 'asc',
        },
        populate: [
          'payloads',
          'rocket',
          'launchpad',
          {
            path: 'cores',
            populate: [
              {
                path: 'landpad',
              },
              {
                path: 'core',
              },
            ],
          },
        ],
      },
    },
  );

  const launchOrder = ['hour', 'day', 'month', 'year', 'quarter', 'half'];

  return data.docs.sort((a, b) => {
    if (a.date_precision === 'hour' && b.date_precision === 'day') {
      return a.date_unix - b.date_unix;
    }

    return (
      launchOrder.indexOf(a.date_precision) -
      launchOrder.indexOf(b.date_precision)
    );
  });
};

export function useUpcomingLaunches() {
  return useQuery(['upcomingLaunches'], getUpcomingLaunches);
}

const getRecentLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await spacexApi.post<LaunchPaginationProps>(
    '/launches/query',
    {
      query: {
        upcoming: false,
      },
      options: {
        pagination: false,
        sort: {
          flight_number: 'desc',
        },
        populate: [
          'payloads',
          'rocket',
          'launchpad',
          {
            path: 'cores',
            populate: [
              {
                path: 'landpad',
              },
              {
                path: 'core',
              },
            ],
          },
        ],
      },
    },
  );

  return data.docs;
};

export function useRecentLaunches() {
  return useQuery(['recentLaunches'], getRecentLaunches);
}
