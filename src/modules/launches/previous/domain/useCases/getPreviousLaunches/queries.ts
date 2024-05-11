import { FetchPreviousLaunchesRepository } from '@modules/launches/previous/data/repository/fetchPreviousLaunches';

const repository = new FetchPreviousLaunchesRepository();

const PREVIOUS_LAUNCHES_QUERY_KEY = '@liftoff/previous-launches';

export const getPreviousLaunchesQuery = {
  queryKey: [PREVIOUS_LAUNCHES_QUERY_KEY],
  initialPageParam: undefined,
  queryFn: ({ pageParam }: { pageParam: any }) => repository.get({ cursor: pageParam }),
  getNextPageParam: (lastPage: any) => lastPage[lastPage.length - 1],
};
