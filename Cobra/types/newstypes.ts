export type Article = {
    id?: number; // New optional ID field
    source: {
      id: string | null;
      name: string;
    };
    topic: string;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  };
  