import { axios } from '@libs/axios';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ArticleResponse } from './types';

const SPACEFLIGHTNEWSAPI = 'https://api.spaceflightnewsapi.net/v4';

export const ARTICLES_QUERY_KEY = 'articles';

const getArticles = async (offset: number): Promise<ArticleResponse> => {
  const response: ArticleResponse = await axios({
    url: `${SPACEFLIGHTNEWSAPI}/articles?limit=10&offset=${offset}`,
    method: 'GET',
  });
  return response;
};

export function useArticles() {
  return useInfiniteQuery([ARTICLES_QUERY_KEY], ({ pageParam = 0 }) => getArticles(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next.split('offset=')[1] : undefined;
    },
  });
}
