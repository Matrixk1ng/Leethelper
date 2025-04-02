import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";


const HomePage = () => {
  const router = useRouter();

  

  
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

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#6d28d9" />;
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IntellectInk</Text>
              <Text style={styles.subtitle}>
                Explore bite-sized insights and stay curious.
              </Text>
      <View style={styles.grid}>

        <TouchableOpacity style={[styles.box, styles.boxLarge]} onPress={() => router.push("/home/news")}>
          <Text style={styles.boxText}>News</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => router.push("/home/books")}>
          <Text style={styles.boxText}>Books</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => router.push("/home/poems")}>
          <Text style={styles.boxText}>Poems</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => router.push("/home/research")}>
          <Text style={styles.boxText}>Scholarly Articles</Text>
        </TouchableOpacity>
        
      </View>
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
    backgroundColor: 'black',
    padding: 16,
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: '#6d28d9',
    width: '48%',
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  boxLarge: {
    width: '100%',
    height: 200,
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

