import { useState } from "react";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerStepOne,
  registerStepTwo,
  registerStepThree,
} from "@/validations/registerSchema";
import { ModalAlert, InputBasic } from "@/components";
import { ZodType } from "zod";
import api from "@/services/api";

const registerSteps: ZodType<any>[] = [
  registerStepOne,
  registerStepTwo,
  registerStepThree,
];

export default function AuthRegisterScreen() {
  const [step, setStep] = useState(1);

  const { control, handleSubmit, trigger } = useForm({
    resolver: zodResolver(registerSteps[step - 1]),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userType: "",
      phone: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep(step + 1);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/users/login", data);
      setModalMessage("Success");
      setModalType("success");
      setModalVisible(true);
    } catch (error) {
      setModalMessage("Error");
      setModalType("error");
      setModalVisible(true);
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
          {step === 1 ? (
            <View style={styles.containerLogin}>
              <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Register</Text>
                <Controller
                  control={control}
                  name="firstName"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <InputBasic
                      labelText="First Name"
                      placeholderText="Enter your first name..."
                      typeInput="default"
                      iconName="user"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <InputBasic
                      labelText="Last Name"
                      placeholderText="Enter your last name..."
                      typeInput="default"
                      iconName="user"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
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
                  )}
                />
              </View>
              <TouchableOpacity onPress={nextStep} style={styles.buttonDefault}>
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          ) : step === 2 ? (
            <View style={styles.containerLogin}>
              <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Register</Text>
                <Controller
                  control={control}
                  name="userType"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <InputBasic
                      labelText="Type User"
                      placeholderText="Enter your user type..."
                      typeInput="default"
                      iconName="bars"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="phone"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <InputBasic
                      labelText="Phone Number"
                      placeholderText="Enter your phone number..."
                      typeInput="phone"
                      iconName="phone"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="birthDate"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <InputBasic
                      labelText="Birth Date"
                      placeholderText="Enter your birth date..."
                      typeInput="date"
                      iconName="calendar"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
              </View>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => setStep(step - 1)}
                  style={styles.buttonBack}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextStep} style={styles.buttonNext}>
                  <Text>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : step === 3 ? (
            <View style={styles.containerLogin}>
              <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Register</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
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
                  )}
                />
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <InputBasic
                      labelText="Confirm Password"
                      placeholderText="Confirm your password..."
                      typeInput="password"
                      iconName="lock"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
              </View>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => setStep(step - 1)}
                  style={styles.buttonBack}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={styles.buttonConfirm}
                >
                  <Text style={{ color: "#FFFFFF" }}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={{ color: "white" }}>Not Found</Text>
          )}
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
  },
  containerLogin: {
    width: "100%",
    paddingVertical: 35,
    paddingHorizontal: 15,
    gap: 40,
    backgroundColor: "#27272a",
    borderRadius: 15,
  },
  containerInput: {
    width: "100%",
    gap: 20,
  },
  containerButton: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonDefault: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  buttonNext: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  buttonBack: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#7c7c7c",
    borderRadius: 8,
  },
  buttonConfirm: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#22c55e",
    borderRadius: 8,
  },
  textTitle: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: 26,
    textAlign: "center",
  },
});
