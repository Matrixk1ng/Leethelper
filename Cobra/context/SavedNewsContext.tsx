import React, { createContext, useContext, useEffect, useState } from "react";
import { Article } from "@/types/newstypes";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

interface SavedNewsContextType {
  savedNews: Article[];
  toggleArticleSave: (article: Article) => void;
  hasSavedArticle: (url: string) => boolean;
}

const SavedNewsContext = createContext<SavedNewsContextType | undefined>(undefined);

export const SavedNewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedNews, setSavedNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSavedNews(data.SavedNews || []);
      }
    };
    fetchSaved();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const saveToFirestore = async () => {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { SavedNews: savedNews },
          { merge: true }
        );
      } catch (err: any) {
        Alert.alert("Save error", err.message);
      }
    };
    saveToFirestore();
  }, [savedNews]);

  const toggleArticleSave = (article: Article) => {
    setSavedNews((prev) => {
      const isSaved = prev.some((a) => a.url === article.url);
      return isSaved
        ? prev.filter((a) => a.url !== article.url)
        : [...prev, article];
    });
  };

  const hasSavedArticle = (url: string) => {
    return savedNews.some((a) => a.url === url);
  };

  return (
    <SavedNewsContext.Provider value={{ savedNews, toggleArticleSave, hasSavedArticle }}>
      {children}
    </SavedNewsContext.Provider>
  );
};

export const useSavedNews = () => {
  const context = useContext(SavedNewsContext);
  if (!context) throw new Error("useSavedNews must be used within a SavedNewsProvider");
  return context;
};
