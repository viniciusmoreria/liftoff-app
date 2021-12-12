import { useQuery } from 'react-query';

import { api } from '@config/api';
import { RocketProps } from '@types';
import { groupBy } from '@utils/helpers';

type RocketByIdType = {
  [key: string]: RocketProps[];
};

export const getRockets = async (): Promise<RocketByIdType> => {
  const { data } = await api.get('/rockets');

  return groupBy(data, 'id');
};

export function useRockets() {
  return useQuery('rockets', getRockets);
}
