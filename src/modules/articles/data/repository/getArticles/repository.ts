import { axios } from '@libs/axios';

import { ArticleResponse } from './schema/types';
import { IFetchArticlesRepository, IFetchArticlesRepositoryParams } from './types';

const SPACEFLIGHTNEWSAPI = 'https://api.spaceflightnewsapi.net/v4';

export class FetchArticlesRepository implements IFetchArticlesRepository {
  async get({ offset }: IFetchArticlesRepositoryParams) {
    const response: ArticleResponse = await axios({
      url: `${SPACEFLIGHTNEWSAPI}/articles?limit=10&offset=${offset}`,
      method: 'GET',
    });

    return response;
  }
}
