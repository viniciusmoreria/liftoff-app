import { LAUNCH_BY_ID_QUERY_KEY } from '@modules/launches/getById/domain/useCases/getLaunchById/useCase';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isAfter } from 'date-fns';
import { useEffect } from 'react';

import { getUpcomingLaunchesQuery } from './queries';

export function useUpcomingLaunches() {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery(getUpcomingLaunchesQuery);

  const upcomingLaunches = data?.filter((launch) => new Date(launch.net) > new Date()) ?? [];

  const nextLaunch = upcomingLaunches?.find((launch) =>
    isAfter(
      new Date(launch.net),
      new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
    )
  );

  const nextFiveLaunches =
    upcomingLaunches?.filter((launch) => new Date(launch.net) > new Date()).slice(1, 6) ?? [];

  useEffect(() => {
    if (upcomingLaunches) {
      upcomingLaunches.forEach((launch) => {
        queryClient.setQueryData([LAUNCH_BY_ID_QUERY_KEY, launch.id], launch);
      });
    }
  }, [upcomingLaunches]);

  return {
    isLoadingUpcomingLaunches: isLoading,
    refetchUpcomingLaunches: refetch,
    upcomingLaunches,
    nextLaunch,
    nextFiveLaunches,
  };
}
