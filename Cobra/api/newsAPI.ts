import { Article } from "@/types/newstypes";

const NEWSAPIKEY = process.env.EXPO_PUBLIC_NEWSAPI_KEY;

export const fetchNews = async (topics: string[]): Promise<Article[]> => {
  let allArticles: Article[] = [];
  for (const topic of topics) {
    const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=${NEWSAPIKEY}`;
    try {
      const response = await fetch(NEWS_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const topicArticles = data.articles.map((article: Article, index: number) => ({
        ...article,
        id: `${topic}-${index}`, // unique ID
      }));

      allArticles = [...allArticles, ...topicArticles];
      console.log("articles", topicArticles)
    } catch (error) {
      console.error(`Error fetching news for topic ${topic}:`, error);
    }
  }
  console.log("all articels", allArticles)
  return allArticles;
};
