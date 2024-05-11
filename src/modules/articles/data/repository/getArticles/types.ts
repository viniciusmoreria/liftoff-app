import { ArticleResponse } from './schema/types';

export type IFetchArticlesRepositoryParams = {
  offset: string;
};

export interface IFetchArticlesRepository {
  get: (params: IFetchArticlesRepositoryParams) => Promise<ArticleResponse>;
}
