import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

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
      <Text style={styles.labelInput}>{labelText}</Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : "transparent" },
        ]}
      >
        <FontAwesome
          name={iconName}
          size={20}
          color="#7e7e7e"
          style={styles.icon}
        />

        {typeInput === "phone" || typeInput === "date" ? (
          <TextInputMask
            type={
              typeInput === "phone"
                ? "cel-phone"
                : typeInput === "date"
                ? "datetime"
                : "custom"
            }
            options={
              typeInput === "phone"
                ? {
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }
                : {
                    format: "DD/MM/YYYY",
                  }
            }
            style={styles.input}
            placeholder={placeholderText}
            placeholderTextColor="#7e7e7e"
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholderText}
            placeholderTextColor="#7e7e7e"
            secureTextEntry={typeInput === "password" ? shownPassword : false}
            keyboardType={typeInput === "email" ? "email-address" : "default"}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
          />
        )}

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
    marginLeft: 3,
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
    marginLeft: 3,
  },
});
