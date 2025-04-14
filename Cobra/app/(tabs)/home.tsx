import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useNews } from "@/context/newsContext";
import { useUserTopics } from "@/hooks/topicsHook";
import { Article } from "@/types/newstypes";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface TopicArticle {
  topic: string;
  article: Article;
}
const HomePage = () => {
  const router = useRouter();

  const { topics } = useUserTopics();
  const { articles } = useNews();

  // gets 1 article per topic and dislays on front page
  const firstArticlesPerTopic: TopicArticle[] = topics
    .map((topic) => {
      const match = articles.find((a) => a.topic === topic);
      return match ? { topic, article: match } : null;
    })
    .filter((item): item is TopicArticle => item !== null); // ✅ This is the magic line

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#6d28d9" />;
  // }
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}    
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>IntellectInk</Text>
        <Text style={styles.subtitle}>
          Explore bite-sized insights and stay curious.
        </Text>
      </View>

      {/* Reading Tracker */}
      <TouchableOpacity
        style={styles.readingTrackerContainer}
        onPress={() => console.log("tracker clicked")}
      >
        <Text style={styles.trackerText}>2 days</Text>
        <Text style={styles.trackerSubText}>Reading tracker</Text>
      </TouchableOpacity>

      {/* Category Grid */}

      <View style={styles.categoryContainer}>
        {/* News scrollView */}
        <ScrollView
          horizontal
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          {firstArticlesPerTopic.map(({ topic, article }, index) => (
            <Pressable
              delayLongPress={30}
              key={index}
              style={[styles.card, { width: screenWidth * 0.9 }]} // Take up 90% of screen
              onPress={() =>
                router.push(`/home/news?topic=${encodeURIComponent(topic)}`)
              }
            >
              <Text style={styles.cardTitle}>{topic}</Text>
              <View
                style={{
                  backgroundColor: "#F9F9F9",
                  padding: 15,
                  borderRadius: 5,
                }}
              >
                <Text style={styles.cardTitle}>{article.title}</Text>
                {article.urlToImage && (
                  <Image
                    source={{ uri: article.urlToImage }}
                    style={styles.articleImage}
                  />
                )}
                {/* <Text style={styles.cardDescription}>{article.description}</Text> */}
                <Text style={styles.articleMeta}>
                  {article.source.name} •{" "}
                  {new Date(article.publishedAt).toDateString()}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.card}
          delayLongPress={30}
          onPress={() => router.push("/home/books")}
        >
          <Text style={styles.cardTitle}>Books</Text>
          <Text>Lots of books</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          delayLongPress={30}
          onPress={() => router.push("/home/poems")}
        >
          <Text style={styles.cardTitle}>Poems</Text>
          <Text>Lots of Poems</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          delayLongPress={30}
          onPress={() => router.push("/home/research")}
        >
          <Text style={styles.cardTitle}>Research</Text>
          <Text>Lots of books</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    paddingTop: 20,
  },
  slider: {
    marginTop: 10,
    paddingVertical: 4,
  },
  headerContainer: {
    marginTop: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: "#666",
  },
  readingTrackerContainer: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#6d28d9",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  trackerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  trackerSubText: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  articleMeta: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 6,
  },
  box: {
    backgroundColor: "#f3f4f6", // light gray card
    borderRadius: 16,
    padding: 16,
    width: "48%",
    height: 100,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  boxText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  topic: {
    color: "#6d28d9",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 6,
  },
  headline: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  articleImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginTop: 8,
  },
  categoryContainer: {
    marginTop: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
});
