import api from "@/services/api";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBasic, ModalAlert } from "@/components";
import { loginSchema } from "@/validations/loginSchema";
import React, { useState } from "react";

export default function AuthLoginScreen() {
  const { control, handleSubmit, trigger } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/users/login", data);
      setModalMessage("Autenticado!");
      setModalType("success");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    } catch (error) {
      setModalMessage("Usuário ou senha inválidos!");
      setModalType("error");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
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
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                return (
                  <InputBasic
                    labelText="Email"
                    placeholderText="Enter your email..."
                    typeInput="email"
                    iconName="envelope"
                    value={value}
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                return (
                  <InputBasic
                    labelText="Password"
                    placeholderText="Enter your password..."
                    typeInput="password"
                    iconName="lock"
                    value={value}
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                );
              }}
            />
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.textForgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <ModalAlert
        modalMessage={modalMessage}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        typeMessage={modalType}
      />
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
