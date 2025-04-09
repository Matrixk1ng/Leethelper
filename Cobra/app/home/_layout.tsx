// /app/home/_layout.tsx
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="news" options={{ title: "News", headerShown: false }} />
      <Stack.Screen name="books" options={{ title: "Books", headerShown: false }} />
      <Stack.Screen name="poems" options={{ title: "Poems", headerShown: false }} />
      <Stack.Screen name="research" options={{ title: "Research", headerShown: false }} />
    </Stack>
  )
}
