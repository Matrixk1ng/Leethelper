import { useSavedNews } from "@/context/SavedNewsContext";
import { auth, db } from "@/firebaseConfig";
import { Article } from "@/types/newstypes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  View,
  Pressable,
  Linking,
  Alert,
} from "react-native";

const saved = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState(true);

  const { savedNews, toggleArticleSave, hasSavedArticle } = useSavedNews();


  

  // this use effect saves to fireStore recalls everytime a new bookmark is made


  return (
    <ScrollView style={styles.container}>
      {loading && savedNews.length === 0 ? (
        <Text style={{color: "black"}}>Bomboclat</Text>
      ) : (
        <FlatList
          data={savedNews}
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
    </ScrollView>
  );
};

export default saved;

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
