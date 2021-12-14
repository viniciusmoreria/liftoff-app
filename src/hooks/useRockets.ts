import { useQuery } from 'react-query';

import { api } from '@config/api';
import { RocketProps } from '@types';

export const getRockets = async (): Promise<RocketProps[]> => {
  const { data } = await api.get('/rockets');

  return data;
};

export function useRockets() {
  return useQuery(['rockets'], getRockets);
}
