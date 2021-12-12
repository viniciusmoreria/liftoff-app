import { useQuery } from 'react-query';

import { api } from '@config/api';
import { LaunchProps } from '@types';

export const getUpcomingLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await api.get('/launches/upcoming');

  return data;
};

export function useUpcomingLaunches() {
  return useQuery('upcomingLaunches', getUpcomingLaunches);
}

export const getPastLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await api.get('/launches/past');

  return data.reverse();
};

export function usePastLaunches() {
  return useQuery('pastLaunches', getPastLaunches);
}
