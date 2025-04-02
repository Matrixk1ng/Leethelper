import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  RefreshControl,
} from "react-native";
import React from "react";
import { useNews } from "@/context/newsContext";
import { useRouter } from "expo-router";
const HomePage = () => {
  // I use context so I am not making api calls everytime I click the news grid
  const { articles, loading, reloadNews } = useNews();
  const router = useRouter();

  if (loading) return <ActivityIndicator size="large" color="#6d28d9" />;
  if (articles.length === 0) return <Text>No news available.</Text>;

  function goBack() {
    router.replace("/home");
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
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
      {loading && articles.length === 0 ? (
        <ActivityIndicator size="large" color="#6d28d9" />
      ) : (
        <FlatList
          data={articles}
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
                <Text style={styles.articleMeta}>
                  {item.source.name} •{" "}
                  {new Date(item.publishedAt).toDateString()}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
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
    paddingBottom: 5,
  },
  articleMeta: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 6,
  },
});
