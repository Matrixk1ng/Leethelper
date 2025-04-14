// e.g. /app/home/books.tsx
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

const dummyData = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "Tiny changes, remarkable results.",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world.",
  },
];

export default function BooksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Books</Text>

      {dummyData.map((book, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#374151",
  },
});
