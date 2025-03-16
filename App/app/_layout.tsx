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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? <Stack.Screen name="(auth)" /> : <Stack.Screen name="(tabs)" />}
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
