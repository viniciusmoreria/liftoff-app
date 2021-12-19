export interface ArticleProps {
  id: string;
  title: string;
  featured: boolean;
  url: string;
  imageUrl: string;
  summary: string;
  publishedAt: string;
  newsSite: string;
  launches: [
    {
      id: string;
      launchId: string;
      name: string;
      articles: string[];
      blogs: string[];
      provider: string;
      created_by: string;
      updated_by: string;
    },
  ];
  events: [
    {
      id: string;
      name: string;
      eventId: number;
      articles: string[];
      blogs: string[];
      provider: string;
      created_by: string;
      updated_by: string;
    },
  ];
}
