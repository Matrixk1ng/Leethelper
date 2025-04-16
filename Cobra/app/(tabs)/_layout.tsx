import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SavedNewsProvider } from "@/context/SavedNewsContext";

export default function TabsLayout() {
  return (
    <SavedNewsProvider>
      <Tabs
        screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "saved",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome size={28} name="bookmark" color={color} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </SavedNewsProvider>
  );
}
