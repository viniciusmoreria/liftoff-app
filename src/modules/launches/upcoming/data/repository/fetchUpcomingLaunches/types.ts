import { Launch } from './schema/types';

export interface IFetchUpcomingLaunchesRepository {
  get: () => Promise<Launch[]>;
}
