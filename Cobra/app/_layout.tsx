import { Stack } from "expo-router";
import { NewsProvider } from "@/context/newsContext";

export default function RootLayout() {
  return (
    <NewsProvider>
      <Stack>
        {<Stack.Screen name="(tabs)" options={{ headerShown: false }} />}
        {<Stack.Screen name="signUp" options={{ headerShown: false }} />}
      </Stack>
    </NewsProvider>
  );
}
