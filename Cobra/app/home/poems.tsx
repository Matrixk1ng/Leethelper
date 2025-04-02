import { View, Text, StyleSheet } from "react-native";

export default function PoemsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poems</Text>
      <Text>Here will be your poem content.</Text>
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
