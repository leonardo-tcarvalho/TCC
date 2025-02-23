import InputBasic from "@/components/InputBasic";
import { useState } from "react";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLoginScreen() {
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#18181b" />
      <View style={styles.container}>
        {step === 1 ? (
          <View style={styles.containerLogin}>
            <View style={styles.containerInput}>
              <Text style={styles.textTitle}>Register</Text>
              <InputBasic
                labelText="First Name"
                placeholderText="Enter your first name..."
                typeInput="default"
                iconName="user"
              />
              <InputBasic
                labelText="Last Name"
                placeholderText="Enter your last name..."
                typeInput="default"
                iconName="user"
              />
              <InputBasic
                labelText="Email"
                placeholderText="Enter your email..."
                typeInput="email"
                iconName="envelope"
              />
            </View>
            <TouchableOpacity
              onPress={() => setStep(2)}
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
              />
              <InputBasic
                labelText="Phone Number"
                placeholderText="Enter your first name..."
                typeInput="numeric"
                iconName="user"
              />
              <InputBasic
                labelText="Birth Date "
                placeholderText="Enter your last name..."
                typeInput="default"
                iconName="user"
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
                onPress={() => setStep(3)}
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
                typeInput="default"
                iconName="lock"
              />
              <InputBasic
                labelText="Confirm Password"
                placeholderText="Enter your password..."
                typeInput="numeric"
                iconName="lock"
              />
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity
                onPress={() => setStep(2)}
                style={styles.buttonBack}
              >
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonConfirm}>
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          "not-found"
        )}
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
