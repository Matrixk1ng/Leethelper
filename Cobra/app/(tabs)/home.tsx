import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import {StatusBar} from 'expo-status-bar'

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
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <Text style={styles.title}>IntellectInk</Text>
      <Text style={styles.subtitle}>Explore bite-sized insights and stay curious.</Text>

      {/* Reading Tracker */}
      <TouchableOpacity style={styles.tracker} onPress={() => console.log("tracker clicked")}>
        <Text style={styles.trackerDays}>2 days</Text>
        <Text style={styles.trackerLabel}>Reading tracker</Text>
      </TouchableOpacity>

      {/* Category Grid */}
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
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  tracker: {
    backgroundColor: "#6d28d9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  trackerDays: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  trackerLabel: {
    color: "#fff",
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    width: "48%",
    height: 100,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  boxLarge: {
    width: "100%",
    height: 140,
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
