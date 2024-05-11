import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';

export type TFetchLaunchByIdParams = {
  id: string;
};

export interface IFetchLaunchByIdRepository {
  get: (params: TFetchLaunchByIdParams) => Promise<Launch>;
}
