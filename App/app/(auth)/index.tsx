import InputBasic from "@/components/InputBasic";
import ModalAlert from "@/components/ModalAlert";
import api from "@/services/api";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLoginScreen() {
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  const handleLogin = async () => {
    let error = "";

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setModalMessage("Login successful!");
        setTypeMessage("success");
        setModalVisible(true);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setTypeMessage("error");
      setModalMessage(error.response?.data?.message || "Error during login.");
      setModalVisible(true);
    }

    if (modalVisible) {
      return (
        <ModalAlert
          modalMessage={modalMessage}
          visible={modalVisible}
          onClose={() => setModalVisible(!modalVisible)}
          typeMessage={typeMessage}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#18181b" />
      <KeyboardAvoidingView
        style={styles.containerKeyboard}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.containerLogin}>
            <Text style={styles.textTitle}>Welcome</Text>
            <InputBasic
              labelText="Email"
              placeholderText="Enter your email..."
              typeInput="email"
              iconName="user"
              onChangeText={setEmail}
              value={email}
            />
            <InputBasic
              labelText="Password"
              placeholderText="Enter your password..."
              typeInput="password"
              iconName="lock"
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.textForgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  containerKeyboard: {
    flex: 1,
    backgroundColor: "#18181b",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  containerLogin: {
    width: "100%",
    paddingVertical: 35,
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
