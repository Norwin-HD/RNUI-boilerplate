import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BottomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}

const BottomButton: React.FC<BottomButtonProps> = ({ onPress, text }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonArrow}>→</Text>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#3476F4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2B79FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
