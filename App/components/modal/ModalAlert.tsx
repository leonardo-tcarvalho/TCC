import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

interface ModalAlertProps {
  modalMessage: string;
  visible: boolean;
  onClose: () => void;
  typeMessage: String;
}

export default function ModalAlert({
  modalMessage,
  visible,
  onClose,
  typeMessage,
}: ModalAlertProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose} // Necessário para Android
    >
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <AntDesign
            name={
              typeMessage === "error"
                ? "exclamationcircleo"
                : typeMessage === "success"
                ? "checkcircleo"
                : typeMessage === "warning"
                ? "exclamationcircleo"
                : "infocirlceo"
            }
            size={65}
            color={
              typeMessage === "error"
                ? "#ef4444"
                : typeMessage === "success"
                ? "#22c55e"
                : typeMessage === "warning"
                ? "#f97316"
                : "#3b82f6"
            }
          />
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
  },
  modalBox: {
    width: "60%",
    padding: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    gap: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
  },
});
