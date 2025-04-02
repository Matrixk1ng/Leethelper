import { View, Text, StyleSheet } from "react-native";

export default function ResearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scholarly Articles</Text>
      <Text>Here will be your research & articles content.</Text>
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
