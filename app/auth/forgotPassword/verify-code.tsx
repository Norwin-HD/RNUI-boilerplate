import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import BottomButton from "../../auth/components/BottomButton";
import ScreenHeader from "../../auth/components/ScreenHeader";
import AppText from "../../auth/components/AppText";
import AlertModal from "../../auth/components/AlertModal";

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null); // mensaje del modal
  const { email } = useLocalSearchParams();

  const maskEmail = (email: string) => {
    if (!email || !email.includes("@")) return email;
    const [user, domain] = email.split("@");
    const maskedUser =
      user.length > 3 ? user.slice(0, 5) + "*".repeat(user.length - 8) : user;
    return `${maskedUser}@${domain}`;
  };

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleContinue = () => {
    const enteredCode = code.join("");
    if (enteredCode.length < 4) {
      setModalMessage("Por favor ingresa el código completo");
      return;
    }
    router.push("/auth/forgotPassword/reset-password");
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
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.content}>
            <ScreenHeader
              title="Ingresar código"
              imageUri="https://ik.imagekit.io/nwogrqfzj/two-factor-authentication.png?updatedAt=1762808714882"
            />

            <View style={styles.textBlock}>
              <AppText variant="bold" style={styles.title}>
                Ingresa el código
              </AppText>
              <AppText variant="medium" style={styles.subtitle}>
                Hemos enviado un código de verificación a{"\n"}
                <AppText variant="bold">
                  tu correo {maskEmail(email as string)}
                </AppText>
              </AppText>
            </View>

            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  style={styles.codeInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  textAlign="center"
                />
              ))}
            </View>

            <AppText variant="medium" style={styles.resendText}>
              ¿No lo has recibido?{" "}
              <AppText
                variant="bold"
                style={styles.resendLink}
                onPress={() => setModalMessage("Código reenviado")}
              >
                Enviar de nuevo
              </AppText>
            </AppText>
          </View>
        </ScrollView>

        <BottomButton onPress={handleContinue} text="Continuar" />
      </KeyboardAvoidingView>

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
    paddingTop: verticalScale(36),
  },
  content: { flexGrow: 1 },
  textBlock: { alignItems: "center", marginBottom: verticalScale(10) },
  title: {
    fontSize: moderateScale(18),
    color: "#111827",
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: "#6B7280",
    textAlign: "center",
    lineHeight: verticalScale(18),
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(25),
    gap: scale(14),
  },
  codeInput: {
    width: scale(55),
    height: verticalScale(55),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#111827",
  },
  resendText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  resendLink: { color: "#3476F4" },
});
