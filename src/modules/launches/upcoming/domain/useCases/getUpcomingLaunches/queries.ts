import { FetchUpcomingLaunchesRepository } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';

const repository = new FetchUpcomingLaunchesRepository();

const UPCOMING_LAUNCHES_QUERY_KEY = '@liftoff/upcoming-launches';

export const getUpcomingLaunchesQuery = {
  queryKey: [UPCOMING_LAUNCHES_QUERY_KEY],
  queryFn: () => repository.get(),
};
