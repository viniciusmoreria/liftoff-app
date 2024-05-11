import { LAUNCH_BY_ID_QUERY_KEY } from '@modules/launches/getById/domain/useCases/getLaunchById/useCase';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getPreviousLaunchesQuery } from './queries';

export function usePreviousLaunches() {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(getPreviousLaunchesQuery);

  const previousLaunches = data?.pages.flat()?.map((launch) => launch.data() as Launch) ?? [];

  const previousFiveLaunches = previousLaunches.slice(0, 5);

  useEffect(() => {
    if (previousLaunches) {
      previousLaunches.forEach((launch) => {
        queryClient.setQueryData([LAUNCH_BY_ID_QUERY_KEY, launch.id], launch);
      });
    }
  }, [previousLaunches]);

  return {
    isLoadingPreviousLaunches: isLoading,
    refetchPreviousLaunches: refetch,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    previousLaunches,
    previousFiveLaunches,
  };
}
