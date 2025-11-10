import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText";

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
      <AppText variant="medium" style={styles.label}>
        {label}
      </AppText>
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
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: scale(14),
    color: "#111827",
    marginBottom: verticalScale(10),
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    fontSize: scale(14),
    color: "#111827",
    fontFamily: "Montserrat_400Regular",
  },
});
