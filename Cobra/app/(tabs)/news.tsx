import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNews } from "@/context/newsContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Article } from "@/types/newstypes";
import { auth, db } from "@/firebaseConfig";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSavedNews } from "@/context/SavedNewsContext";


const news = () => {
  // I use context so I am not making api calls everytime I click the news grid
  const [user, setUser] = useState<User | null>(null);
  const { savedNews, toggleArticleSave, hasSavedArticle } = useSavedNews();

  const { articles, loading, reloadNews } = useNews();
  const router = useRouter();
  const { topic } = useLocalSearchParams<{ topic: string }>();

 

  



  
  

  if (loading) return <ActivityIndicator size="large" color="#6d28d9" />;
  if (articles.length === 0) return <Text>No news available.</Text>;
  const filteredArticles = topic
    ? articles.filter((a) => a.topic?.toLowerCase() === topic.toLowerCase())
    : articles;

  function goBack() {
    router.push("/home");
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>

      {/* Content List */}
      {loading && articles.length === 0 ? (
        <ActivityIndicator size="large" color="#6d28d9" />
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id?.toString() || item.url}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reloadNews}
              colors={["#6d28d9"]}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.section}>
              <View style={styles.articleCard}>
                <Text
                  style={styles.articleTitleLink}
                  onPress={() => Linking.openURL(item.url)}
                >
                  {item.title}
                </Text>
                <Text style={styles.articleExcerpt}>{item.description}</Text>
                {item.urlToImage && (
                  <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.articleImage}
                  />
                )}
                <View style={styles.metaRow}>
                  <Text style={styles.articleMeta}>
                    {item.source.name} •{" "}
                    {new Date(item.publishedAt).toDateString()}
                  </Text>
                  <Pressable
                    onPress={() => {
                      toggleArticleSave(item);
                    }}
                  >
                    {hasSavedArticle(item.url) ? (
                      <FontAwesome name="bookmark" size={16} color="#9ca3af" />
                    ) : (
                      <FontAwesome
                        name="bookmark-o"
                        size={16}
                        color="#9ca3af"
                      />
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

export default news;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  articleTitleLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb", // blue-ish for link styling
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "black", // light gray
    marginVertical: 8,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
  button: {
    height: 60,
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  articleCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  articleExcerpt: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
    paddingBottom: 5,
  },
  articleMeta: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 6,
    flex: 1,
  },
  bookmark: {
    alignItems: "flex-end",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
});
