import { StyleSheet, View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importando o ícone

interface InputBasicProps {
  labelText: string;
  typeInput: string;
  placeholderText: string;
  iconName: string; // Nome do ícone
}

export default function InputBasic({
  labelText,
  typeInput,
  placeholderText,
  iconName,
}: InputBasicProps) {
  return (
    <View style={styles.containerInput}>
      <Text style={styles.labelInput}>{labelText}</Text>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={20} color="#7e7e7e" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          placeholderTextColor="#7e7e7e"
          secureTextEntry={typeInput === "password"}
          keyboardType={
            typeInput === "email"
              ? "email-address"
              : typeInput === "numeric"
              ? "numeric"
              : "default"
          }
        />
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
});
