import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import InputValidation from "@/components/InputValidation";

interface InputBasicProps {
  labelText: string;
  typeInput: "default" | "email" | "phone" | "date" | "password";
  placeholderText: string;
  iconName: string;
  onChangeText: (text: string) => void;
  value: string;
}

export default function InputBasic({
  labelText,
  typeInput,
  placeholderText,
  iconName,
  onChangeText,
  value,
}: InputBasicProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [shownPassword, setShownPassword] = useState(true);

  const validateInput = (text: string) => {
    let isValid = true;
    if (
      typeInput === "email" ||
      typeInput === "phone" ||
      typeInput === "date"
    ) {
      isValid = InputValidation({ typeInput, valueInput: text });
    }

    setErrorMessage(isValid ? "" : "Invalid format");
    onChangeText(text);
  };

  return (
    <View style={styles.containerInput}>
      <Text style={styles.labelInput}>{labelText}</Text>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={20} color="#7e7e7e" style={styles.icon} />
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder={placeholderText}
          placeholderTextColor="#7e7e7e"
          secureTextEntry={typeInput === "password" ? shownPassword : false}
          keyboardType={
            typeInput === "email"
              ? "email-address"
              : typeInput === "phone"
              ? "phone-pad"
              : "default"
          }
          onChangeText={validateInput}
          value={value}
        />
        {typeInput === "password" && (
          <TouchableOpacity
            onPress={() => setShownPassword(!shownPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={shownPassword ? "eye-slash" : "eye"}
              size={20}
              color="#7e7e7e"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    width: "100%",
    gap: 7,
  },
  labelInput: {
    marginLeft: 8,
    fontSize: 14,
    color: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181b",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
