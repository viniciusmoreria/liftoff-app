import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { ARTICLE_BY_ID_QUERY_KEY, getArticlesQuery } from './queries';

export function useArticles() {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(getArticlesQuery);

  const articles = data?.pages.flatMap((page) => page.results) ?? [];

  const mostRecentArticles = articles.slice(0, 5);

  useEffect(() => {
    if (articles) {
      articles.forEach((article) => {
        queryClient.setQueryData([ARTICLE_BY_ID_QUERY_KEY, article.id], article);
      });
    }
  }, [articles]);

  return {
    isLoadingArticles: isLoading,
    refetchArticles: refetch,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    articles,
    mostRecentArticles,
  };
}
