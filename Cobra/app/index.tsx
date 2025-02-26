import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Adjust path if firebaseConfig.js is elsewhere
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const app = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("App starting, using Firebase JS SDK");
    const unsubscribe = onAuthStateChanged(auth, (userState) => {
      console.log("Auth state:", userState ? userState.email : "No user");
      setUser(userState); // Now TypeScript knows userState is User | null
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      console.log("Sign-in attempt with:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in:", userCredential.user.email);
      router.push("/(tabs)/homepage");
    } catch (error: any) {
      console.error("Sign-in error:", error.code, error.message);
      Alert.alert("Sign-in Failed", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cobra</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="white"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          placeholderTextColor="white"
        />

        <Link href="/signUp" style={{ marginHorizontal: "auto" }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={signIn}>
            Sign in
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50, // Adjust this value to move the content lower
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
  image: {
    width: 50,
    height: 50,
  },
  input: {
    color: "white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
  button: {
    height: 60,
    borderRadius: 20,
    padding: 6,
  },
});
