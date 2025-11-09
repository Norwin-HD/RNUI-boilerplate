import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface EmailInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
}


export default function EmailInput({
  label = "Correo electrónico",
  value,
  onChangeText,
  placeholder = "e.g. example@gmail.com",
  style = {},
}: EmailInputProps) {
  return (
    <View style={[styles.inputBlock, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBlock: {
    marginTop: 0,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111827",
  },
});
