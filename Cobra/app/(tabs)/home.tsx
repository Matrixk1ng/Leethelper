import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { fetchNews } from "@/api/newsAPI";
import { Article } from "@/types/newstypes";

const HomePage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchNews();
        if (news === undefined) {
          return new Error("Undefined");
        }
        setArticles(news);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);
  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      await signOut(auth);
      console.log("Signed out");
      router.replace("/");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6d28d9" />;
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>IntellectInk</Text>
      <Text style={styles.subtitle}>
        Explore bite-sized insights and stay curious.
      </Text>

      {/* Reading Tracker */}
      <TouchableOpacity style={styles.tracker}>
        <Text style={styles.trackerDays}>2 days</Text>
        <Text style={styles.trackerLabel}>Reading tracker</Text>
      </TouchableOpacity>

      {/* Content List */}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id?.toString() || item.url}
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
              <Text style={styles.articleMeta}>
                {item.source.name} • {new Date(item.publishedAt).toDateString()}
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    backgroundColor: "#e5e7eb", // light gray
    marginVertical: 8,
  },
  articleImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
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
  tracker: {
    backgroundColor: "#6d28d9",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  trackerDays: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  trackerLabel: {
    color: "#fff",
    fontSize: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  articleCard: {
    backgroundColor: "black",
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
  },
  articleMeta: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 6,
  },
});
