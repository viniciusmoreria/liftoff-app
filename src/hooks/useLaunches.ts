import { useQuery } from 'react-query';

import { api } from '@config/api';
import { LaunchProps, LaunchPaginationProps } from '@types';

export const getUpcomingLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await api.post<LaunchPaginationProps>('/launches/query', {
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
  });

  return data.docs;
};

export function useUpcomingLaunches() {
  return useQuery(['upcomingLaunches'], getUpcomingLaunches);
}

export const getPastLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await api.get('/launches/past');

  return data.reverse();
};

export function usePastLaunches() {
  return useQuery(['pastLaunches'], getPastLaunches);
}
