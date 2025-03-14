// InputBasic.tsx
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

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
  const [shownPassword, setShownPassword] = useState(true);

  const formatInput = (text: string) => {
    let formattedText = text;

    if (typeInput === "phone") {
      formattedText = text
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);

      const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
      if (!phoneRegex.test(formattedText) && formattedText.length === 15)
        return;
    } else if (typeInput === "date") {
      formattedText = text
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 10);

      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
      if (!dateRegex.test(formattedText) && formattedText.length === 10) return;
    } else if (typeInput === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    }

    onChangeText(formattedText);
  };

  return (
    <View style={styles.containerInput}>
      <Text style={styles.labelInput}>{labelText}</Text>
      <View style={styles.inputContainer}>
        <FontAwesome
          name={iconName}
          size={20}
          color="#7e7e7e"
          style={styles.icon}
        />
        <TextInput
          style={[styles.input]}
          placeholder={placeholderText}
          placeholderTextColor="#7e7e7e"
          secureTextEntry={typeInput === "password" ? shownPassword : false}
          keyboardType={
            typeInput === "email"
              ? "email-address"
              : typeInput === "phone"
              ? "phone-pad"
              : typeInput === "date"
              ? "numeric"
              : "default"
          }
          onChangeText={formatInput}
          value={value}
        />
        {typeInput === "password" && (
          <TouchableOpacity
            onPress={() => setShownPassword(!shownPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={shownPassword ? "eye-slash" : "eye"}
              size={20}
              color="#7e7e7e"
            />
          </TouchableOpacity>
        )}
      </View>
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
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 10,
  },
});
