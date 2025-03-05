import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, AntDesign } from "react-native-vector-icons";

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
          <View style={styles.closeBox}>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={40} color="#7e7e7e" />
            </TouchableOpacity>
          </View>
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
            size={130}
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
    width: "80%",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    padding: 20,
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#18181b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeBox: {
    width: "100%",
    alignItems: "flex-end",
  },
});
