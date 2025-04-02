// /context/NewsContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchNews } from "@/api/newsAPI";
import { useUserTopics } from "@/hooks/topicsHook";
import { Article } from "@/types/newstypes";

interface NewsContextType {
  articles: Article[];
  loading: boolean;
  reloadNews: () => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const { topics, loading: topicsLoading } = useUserTopics();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    if (topicsLoading) return;
    if (topics.length === 0) {
      setArticles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const news = await fetchNews(topics);
    setArticles(news);
    setLoading(false);
  }, [topics, topicsLoading]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <NewsContext.Provider value={{ articles, loading, reloadNews: loadNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNews must be used inside NewsProvider");
  return context;
};
