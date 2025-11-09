import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import BottomButton from "../components/BottomButton";
import PasswordInput from "../components/PasswordInput";
import ScreenHeader from "../components/ScreenHeader";
import TitleSubtitle from "../components/TittleSubtitle";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleContinue = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor completa ambos campos.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    router.push("/auth/forgotPassword/success");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <ScreenHeader
              title="Reestablecer contraseña"
              imageUri="https://drive.google.com/uc?export=download&id=171kYG3KkXzBnyUU_U_8qw2-36OkRcxHN"
            />

            <TitleSubtitle
              title="Reestablecer contraseña"
              subtitle="Tu nueva contraseña debe ser diferente a la contraseña anterior"
            />

            <PasswordInput
              label="Nueva contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              showConfirm
              confirmValue={confirmPassword}
              onChangeConfirm={setConfirmPassword}
            />
          </View>
        </ScrollView>

        <BottomButton text="Continuar" onPress={handleContinue} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 50 },
  content: { flexGrow: 1 },
});
