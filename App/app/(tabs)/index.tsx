import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Home() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext deve ser usado dentro de um AuthProvider");
  }

  const { user } = authContext;

  return (
    <View>
      <Text>Olá {user?.name.split(" ")[0]}</Text>
    </View>
  );
}
