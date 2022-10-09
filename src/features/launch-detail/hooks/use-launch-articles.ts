import { Article } from '@features/home/hooks/types';
import { axios } from '@libs/axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const SPACEFLIGHTNEWSAPI = 'https://api.spaceflightnewsapi.net/v3';

export const LAUNCH_ARTICLES_QUERY_KEY = 'launch-articles';

const getArticles = async (launchId: string, start: number): Promise<Article[]> => {
  const response = await axios({
    url: `${SPACEFLIGHTNEWSAPI}/articles/launch/${launchId}?_limit=10&_start=${start}`,
    method: 'GET',
  });
  return response;
};

export function useLaunchArticles({ launchId }: { launchId: string }) {
  return useInfiniteQuery(
    [LAUNCH_ARTICLES_QUERY_KEY, launchId],
    ({ pageParam = 0 }) => getArticles(launchId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length * 10 : undefined),
    }
  );
}
