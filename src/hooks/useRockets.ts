import { useQuery } from 'react-query';

import { spacexApi } from '@config/api';
import { RocketProps } from '@types';

export const getRockets = async (): Promise<RocketProps[]> => {
  const { data } = await spacexApi.get('/rockets');

  return data;
};

export function useRockets() {
  return useQuery(['rockets'], getRockets);
}
