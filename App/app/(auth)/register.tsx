import axios from "axios";
import InputBasic from "@/components/InputBasic";
import ModalAlert from "@/components/ModalAlert";
import { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function AuthLoginScreen() {
  // Passos do registro
  const [step, setStep] = useState(1);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  // Dados do usuário
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Funções de validação
  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string): boolean =>
    /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
  const isValidDate = (date: string): boolean =>
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(date);

  // Função para avançar para o próximo passo
  const handleNextStep = () => {
    let error = "";

    if (step === 1) {
      if (!firstName || !lastName || !email) {
        error = "All fields are required.";
      } else if (!isValidEmail(email)) {
        error = "Invalid email format.";
      }
    } else if (step === 2) {
      if (!userType || !phoneNumber || !birthDate) {
        error = "All fields are required.";
      } else if (!isValidPhone(phoneNumber)) {
        error = "Invalid phone number format.";
      } else if (!isValidDate(birthDate)) {
        error = "Invalid date format.";
      }
    } else if (step === 3) {
      if (!password || !confirmPassword) {
        error = "All fields are required.";
      } else if (password !== confirmPassword) {
        error = "Passwords do not match.";
      }
    }

    if (error) {
      setModalMessage(error);
      setModalVisible(true);
      return;
    }

    setStep(step + 1);
  };

  // Função de registro
  const handleRegister = async () => {
    let error = "";

    if (password !== confirmPassword) {
      error = "Passwords do not match.";
      setModalMessage(error);
      setModalVisible(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.15.4:5000/api/users/register",
        {
          firstName,
          lastName,
          email,
          userType,
          phone: phoneNumber,
          birthDate,
          password,
        }
      );

      if (response.status === 201) {
        setModalMessage("Registration successful!");
        setTypeMessage("success");
        setModalVisible(true);
        setStep(1); // Redireciona para o primeiro passo ou tela de login
      }
    } catch (error: any) {
      console.error("Registration error:", error); // Adicione este log para depuração
      setTypeMessage("error");
      setModalMessage(
        error.response?.data?.message || "Error during registration."
      );
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
                <InputBasic
                  labelText="First Name"
                  placeholderText="Enter your first name..."
                  typeInput="default"
                  iconName="user"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <InputBasic
                  labelText="Last Name"
                  placeholderText="Enter your last name..."
                  typeInput="default"
                  iconName="user"
                  value={lastName}
                  onChangeText={setLastName}
                />
                <InputBasic
                  labelText="Email"
                  placeholderText="Enter your email..."
                  typeInput="email"
                  iconName="envelope"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <TouchableOpacity
                onPress={handleNextStep}
                style={styles.buttonDefault}
              >
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          ) : step === 2 ? (
            <View style={styles.containerLogin}>
              <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Register</Text>
                <InputBasic
                  labelText="Type User"
                  placeholderText="Enter your user type..."
                  typeInput="default"
                  iconName="bars"
                  value={userType}
                  onChangeText={setUserType}
                />
                <InputBasic
                  labelText="Phone Number"
                  placeholderText="Enter your phone number..."
                  typeInput="phone"
                  iconName="phone"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
                <InputBasic
                  labelText="Birth Date"
                  placeholderText="Enter your birth date..."
                  typeInput="date"
                  iconName="calendar"
                  value={birthDate}
                  onChangeText={setBirthDate}
                />
              </View>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={styles.buttonBack}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextStep}
                  style={styles.buttonNext}
                >
                  <Text>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : step === 3 ? (
            <View style={styles.containerLogin}>
              <View style={styles.containerInput}>
                <Text style={styles.textTitle}>Register</Text>
                <InputBasic
                  labelText="Password"
                  placeholderText="Enter your password..."
                  typeInput="password"
                  iconName="lock"
                  value={password}
                  onChangeText={setPassword}
                />
                <InputBasic
                  labelText="Confirm Password"
                  placeholderText="Confirm your password..."
                  typeInput="password"
                  iconName="lock"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => setStep(2)}
                  style={styles.buttonBack}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleRegister}
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
        onClose={() => setModalVisible(!modalVisible)}
        typeMessage={typeMessage}
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
