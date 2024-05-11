import { FetchLaunchByIdRepository } from '@modules/launches/getById/data/repository/fetchById';
import { TFetchLaunchByIdParams } from '@modules/launches/getById/data/repository/fetchById/types';
import { useQuery } from '@tanstack/react-query';

export const LAUNCH_BY_ID_QUERY_KEY = '@liftoff/launch-by-id';

export function useGetLaunchById({ id }: TFetchLaunchByIdParams) {
  const repository = new FetchLaunchByIdRepository();

  const { data, isLoading } = useQuery({
    queryKey: [LAUNCH_BY_ID_QUERY_KEY, id],
    queryFn: () => repository.get({ id }),
  });

  return {
    launch: data,
    isLoading,
  };
}
