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
  onBlur: () => void;
  value: string;
  error?: string;
}

export default function InputBasic({
  labelText,
  typeInput,
  placeholderText,
  iconName,
  onChangeText,
  onBlur,
  value,
  error,
}: InputBasicProps) {
  const [shownPassword, setShownPassword] = useState(true);

  return (
    <View style={styles.containerInput}>
      {/* Label do input */}
      <Text style={styles.labelInput}>{labelText}</Text>

      {/* Campo de input */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : "#7e7e7e" },
        ]}
      >
        <FontAwesome
          name={iconName}
          size={20}
          color="#7e7e7e"
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          placeholderTextColor="#7e7e7e"
          secureTextEntry={typeInput === "password" ? shownPassword : false}
          keyboardType={
            typeInput === "email"
              ? "email-address"
              : typeInput === "phone" || typeInput === "date"
              ? "numeric"
              : "default"
          }
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
        />

        {/* Botão para mostrar/ocultar senha */}
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

      {/* Exibição do erro */}
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    borderWidth: 1,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 3,
  },
});
