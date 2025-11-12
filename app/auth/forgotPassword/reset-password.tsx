import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import BottomButton from "../components/BottomButton";
import PasswordInput from "../components/PasswordInput";
import ScreenHeader from "../components/ScreenHeader";
import TitleSubtitle from "../components/TittleSubtitle";
import AlertModal from "../../auth/components/AlertModal";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleContinue = () => {
    if (!newPassword || !confirmPassword) {
      setModalMessage("Por favor completa ambos campos.");
      return;
    }
    if (newPassword.length < 6) {
      setModalMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      return;
    }
    router.push("/auth/forgotPassword/success");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <ScreenHeader
            title="Reestablecer contraseña"
            imageUri="https://ik.imagekit.io/nwogrqfzj/Mobile-login.png?updatedAt=1762808837904"
            onBack={() => router.back()}
          />

          <TitleSubtitle
            title="Reestablecer contraseña"
            subtitle="Tu nueva contraseña debe ser diferente a la anterior."
            titleStyle={{
              fontSize: moderateScale(20),
              marginBottom: verticalScale(0),
            }}
            subtitleStyle={{
              fontSize: moderateScale(14),
              lineHeight: verticalScale(20),
            }}
          />

          <PasswordInput
            label="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            showConfirm
            confirmValue={confirmPassword}
            onChangeConfirm={setConfirmPassword}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton text="Continuar" onPress={handleContinue} />

      <AlertModal
        visible={!!modalMessage}
        message={modalMessage}
        onClose={() => setModalMessage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", minHeight: "100%" },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(0),
  },
});
