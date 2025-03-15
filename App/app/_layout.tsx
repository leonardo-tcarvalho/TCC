import { Stack } from "expo-router";
import { AuthProvider, AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const RootStack = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { user } = authContext;

  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
