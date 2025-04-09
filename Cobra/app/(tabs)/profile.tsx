import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig"; // adjust the path based on your structure
import { User, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const allTopics = [
  "Technology",
  "Science",
  "Health",
  "Gaming",
  "Business",
  "Entertainment",
  "General",
  "Sports",
];

const profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
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

  const toggleTopic = (topic: string) => {
    setSelectedTopics(
      (prev) =>
        prev.includes(topic)
          ? prev.filter((t) => t !== topic) // deselect
          : [...prev, topic] // select
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      setUser(currentUser);

      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const preferences = data.preferences || [];
        setSelectedTopics(preferences); // Pre-select in modal too
      } else {
        setSelectedTopics([]);
      }
    };

    fetchUserData();
  }, []);

  const savePreferences = async (topics: string[]) => {
    const user = auth.currentUser;
    try {
      if (!user) {
        return new Error("User not found");
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          preferences: topics,
        },
        { merge: true }
      ); // merge keeps existing fields untouched
    } catch (error: any) {
      Alert.alert("Sign-in Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#999" />
      </View>
      {user ? (
        <>
          <Text style={styles.name}>{user.displayName || "No Name"}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </>
      ) : (
        <Text style={styles.email}>Loading user info...</Text>
      )}

      {/* Placeholder for topics */}
      <Text style={styles.sectionTitle}>Topics of Interest</Text>
      <View style={styles.topicContainer}>
        {selectedTopics.length > 0 ? (
          selectedTopics.map((topic, index) => (
            <View key={index} style={styles.topicChip}>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "#999" }}>No topics selected</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.updateButtonText}>Update Preferences</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select your topics</Text>
            <View style={styles.topicList}>
              {allTopics.map((topic, index) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.topicChip,
                      isSelected && styles.topicChipSelected,
                    ]}
                    onPress={() => toggleTopic(topic)}
                  >
                    <Text
                      style={[
                        styles.topicText,
                        isSelected && styles.topicTextSelected,
                      ]}
                    >
                      {topic}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible), savePreferences(selectedTopics);
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};
export default profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  topicList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  topicChip: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 6,
  },
  topicChipSelected: {
    backgroundColor: "#6d28d9",
  },
  topicText: {
    fontSize: 14,
    color: "#333",
  },
  topicTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // dimmed background
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  topicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  updateButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
