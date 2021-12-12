import axios from 'axios';
import { useQuery } from 'react-query';

import constants from '@config/constants';
import { RocketProps } from '@types';
import { groupBy } from '@utils/helpers';

type RocketByIdType = {
  [key: string]: RocketProps[];
};

export const getRockets = async (): Promise<RocketByIdType> => {
  const { data } = await axios.get(`${constants.BASE_URL}/rockets`);

  return groupBy(data, 'id');
};

export function useRockets() {
  return useQuery('rockets', getRockets);
}
