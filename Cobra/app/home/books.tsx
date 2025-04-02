import { View, Text, StyleSheet } from "react-native";

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books</Text>
      <Text>Here will be your book content.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
