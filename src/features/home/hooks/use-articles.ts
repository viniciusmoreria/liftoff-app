import { axios } from '@libs/axios';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Article } from './types';

const SPACEFLIGHTNEWSAPI = 'https://api.spaceflightnewsapi.net/v3';

const getArticles = async (start: number): Promise<Article[]> => {
  const response = await axios({
    url: `${SPACEFLIGHTNEWSAPI}/articles?_limit=10&_start=${start}`,
    method: 'GET',
  });
  return response;
};

export function useArticles() {
  return useInfiniteQuery(['articles'], ({ pageParam = 0 }) => getArticles(pageParam), {
    getNextPageParam: (lastPage) => lastPage.length,
  });
}
