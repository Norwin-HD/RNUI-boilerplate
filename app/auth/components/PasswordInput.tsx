import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

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
      <Text style={[styles.label, { fontFamily: "Montserrat_500Medium" }]}>{label}</Text>

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
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={scale(24)} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {showConfirm && (
        <>
          <Text
            style={[
              styles.label,
              { marginTop: verticalScale(16), fontFamily: "Montserrat_500Medium" },
            ]}
          >
            Confirmar contraseña
          </Text>
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
                size={scale(24)}
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
  container: { marginBottom: verticalScale(14) },
  label: { fontSize: scale(14), color: "#111827", marginBottom: verticalScale(10) },
  inputWrapper: { position: "relative", width: "100%" },
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
  eyeButton: { position: "absolute", right: scale(10), top: verticalScale(12) },
});

export default PasswordInput;
