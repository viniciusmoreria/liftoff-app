import { axios } from '@libs/axios';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Article } from './types';

const SPACEFLIGHTNEWSAPI = 'https://api.spaceflightnewsapi.net/v3';

export const ARTICLES_QUERY_KEY = 'articles';

const getArticles = async (start: number): Promise<Article[]> => {
  const response = await axios({
    url: `${SPACEFLIGHTNEWSAPI}/articles?_limit=10&_start=${start}`,
    method: 'GET',
  });
  return response;
};

export function useArticles() {
  return useInfiniteQuery([ARTICLES_QUERY_KEY], ({ pageParam = 0 }) => getArticles(pageParam), {
    getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length * 10 : undefined),
  });
}
