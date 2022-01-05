import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { newsApi } from '@config/api';
import { ArticleProps } from '@types';

const getArticles = async (page: number): Promise<ArticleProps[]> => {
  const { data } = await newsApi.get(`/articles?_limit=20&_start=${page}`);

  return data;
};

export function useArticles(): UseInfiniteQueryResult<ArticleProps[], unknown> {
  return useInfiniteQuery('articles', ({ pageParam = 0 }) =>
    getArticles(pageParam),
  );
}
