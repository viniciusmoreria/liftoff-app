import axios from 'axios';
import { useQuery } from 'react-query';

import constants from '@config/constants';
import { LaunchProps } from '@types';

export const getUpcomingLaunches = async (): Promise<LaunchProps[]> => {
  const { data } = await axios.get(`${constants.BASE_URL}/launches/upcoming`);

  return data;
};

export function useUpcomingLaunches() {
  return useQuery('upcomingLaunches', getUpcomingLaunches);
}
