import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AlertModalProps {
  visible: boolean;
  message: string | null;
  onClose: () => void;
}

const AlertModal = ({ visible, message, onClose }: AlertModalProps) => {
  if (!message) return null;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
