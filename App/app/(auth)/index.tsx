import InputBasic from "@/components/InputBasic";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLoginScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#18181b" />
      <View style={styles.container}>
        <View style={styles.containerLogin}>
          <Text style={styles.textTitle}>Welcome</Text>
          <InputBasic
            labelText="Email"
            placeholderText="Enter your email..."
            typeInput="email"
            iconName="user"
          />
          <InputBasic
            labelText="Password"
            placeholderText="Enter your password..."
            typeInput="password"
            iconName="lock"
          />
          <TouchableOpacity style={styles.button}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.textForgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 25,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#18181b",
  },
  containerLogin: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 20,
    backgroundColor: "#27272a",
    borderRadius: 15,
  },
  containerInput: {
    width: "100%",
    gap: 7,
  },
  labelInput: {
    marginLeft: 8,
    fontSize: 14,
    color: "#ffffff",
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "white",
    borderRadius: 8,
    backgroundColor: "#18181b",
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  textForgotPassword: {
    color: "#ffffff",
    fontSize: 12,
  },
  textTitle: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: 26,
    textAlign: "center",
  },
});
