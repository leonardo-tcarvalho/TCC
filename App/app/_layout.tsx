import { Stack } from "expo-router";

export default function RootLayout() {
  const user = "sada";
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
