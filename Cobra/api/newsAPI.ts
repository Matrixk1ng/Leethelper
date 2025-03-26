import { Article } from "@/types/newstypes";
const NEWSAPIKEY = process.env.EXPO_PUBLIC_NEWSAPI_KEY;
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${NEWSAPIKEY}`;

export const fetchNews = async (): Promise<Article[]> => {
    try {
      const response = await fetch(NEWS_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      
      // Add a unique id field dynamically
      return data.articles.map((article: Article, index: number) => ({
        ...article,
        id: index + 1, // Ensure every article has a unique ID
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };
