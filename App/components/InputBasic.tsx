import Icon from "react-native-vector-icons/FontAwesome";
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
  typeInput: string;
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
  return (
    <View style={styles.containerInput}>
      <Text style={styles.labelInput}>{labelText}</Text>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={20} color="#7e7e7e" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          placeholderTextColor="#7e7e7e"
          secureTextEntry={typeInput === "password" ? shownPassword : false}
          keyboardType={
            typeInput === "email"
              ? "email-address"
              : typeInput === "numeric"
              ? "numeric"
              : "default"
          }
          onChangeText={onChangeText}
          value={value}
        />
        {typeInput.toLowerCase() === "password" && (
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
