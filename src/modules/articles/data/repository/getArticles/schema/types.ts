export interface Article {
  id: string;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  featured: boolean;
  launches: [
    {
      launch_id: string;
      provider: string;
    },
  ];
  events: [
    {
      event_id: string;
      provider: string;
    },
  ];
}

export type ArticleResponse = {
  count: number;
  next: string;
  previous: string;
  results: Article[];
};
