import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import problemsData from "../../problems.json"; // Adjust path if needed

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description?: string;
  examples?: string[];
}


const HomePage = () => {
  const router = useRouter();
  const [problems] = useState<Problem[]>(problemsData as Problem[]);

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

  const renderItem = ({ item }: { item: Problem }) => (
    <Pressable
      style={styles.item}
      onPress={() =>
        router.push({ pathname: "/problems/[id]", params: { id: item.id } })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.difficulty}>{item.difficulty}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={problems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.header}>Problems</Text>}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSignOut}>
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
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
  title: { color: "white", fontSize: 18, fontWeight: "bold" },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "gray" },
  difficulty: { color: "#888", fontSize: 14 },
  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
