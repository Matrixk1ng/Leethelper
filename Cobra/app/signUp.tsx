import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Fix here

  const [loading, setLoading] = useState(true);

  const signUp = async () => {
    try {
      console.log("Sign-up attempt with:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered:", userCredential.user.email);
      setLoading(false)
      router.push("/(tabs)/home");
    } catch (error : any) {
      console.error("Sign-up error:", error.code, error.message);
      Alert.alert("Sign-up Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
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
      {loading ? (
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      ) : (
        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      )}
      {/*
        <Link href="/homePage" style={{ marginHorizontal: "auto" }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </Link>*/}
    </View>
  );
};

export default registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
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
  input: {
    color: "white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    width: "80%",
    paddingHorizontal: 10,
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
