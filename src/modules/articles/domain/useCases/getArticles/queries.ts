import { FetchArticlesRepository } from '@modules/articles/data/repository/getArticles';

const repository = new FetchArticlesRepository();

const ARTICLES_QUERY_KEY = '@liftoff/articles';
export const ARTICLE_BY_ID_QUERY_KEY = '@liftoff/article-by-id';

export const getArticlesQuery = {
  queryKey: [ARTICLES_QUERY_KEY],
  queryFn: ({ pageParam }: { pageParam: any }) => repository.get({ offset: pageParam }),
  initialPageParam: '0',
  getNextPageParam: (lastPage: any) => {
    return lastPage.next ? lastPage.next.split('offset=')[1] : undefined;
  },
};
