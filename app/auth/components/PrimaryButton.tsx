import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import AppText from "../components/AppText";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
}

export default function PrimaryButton({
  title,
  onPress,
  style,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AppText variant="bold" style={styles.text}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3476F4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
