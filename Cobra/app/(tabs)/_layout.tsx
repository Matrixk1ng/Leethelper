import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="problems" options={{ title: "Problems" }} />
      {/* Add more tabs later, e.g., Profile, Stats */}
    </Tabs>
  );
}