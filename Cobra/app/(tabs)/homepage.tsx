import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const HomePage = () => {
  const router = useRouter()
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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
      <Pressable style={styles.button}>
                <Text style={styles.buttonText} onPress={handleSignOut}>Sign out</Text>
              </Pressable>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
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
});
