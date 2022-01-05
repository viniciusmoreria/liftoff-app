import { useQuery } from 'react-query';

import { spacexApi } from '@config/api';
import { LaunchProps, LaunchPaginationProps } from '@types';

const getUpcomingLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await spacexApi.post<LaunchPaginationProps>(
    '/launches/query',
    {
      query: {
        upcoming: true,
      },
      options: {
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
                select: 'name',
              },
              {
                path: 'core',
                select: 'serial',
              },
            ],
          },
        ],
      },
    },
  );

  const launchOrder = ['hour', 'day', 'month', 'year', 'quarter', 'half'];

  return data.docs.sort(
    (a, b) =>
      launchOrder.indexOf(a.date_precision) -
      launchOrder.indexOf(b.date_precision),
  );
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
                select: 'name',
              },
              {
                path: 'core',
                select: 'serial',
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
