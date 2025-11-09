import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  confirmValue?: string;
  onChangeConfirm?: (text: string) => void;
  showConfirm?: boolean;
  minLength?: number;
}


const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  showConfirm = false,
  confirmValue,
  onChangeConfirm,
  minLength = 6,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || "Ingresa tu contraseña"}
          placeholderTextColor="#BDBDBD"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {showConfirm && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Confirmar contraseña</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={confirmValue}
              onChangeText={onChangeConfirm}
              placeholder="Confirma tu contraseña"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: "500", color: "#111827", marginBottom: 6 },
  inputWrapper: { position: "relative", width: "100%" },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111827",
  },
  eyeButton: { position: "absolute", right: 10, top: 12 },
});

export default PasswordInput;
