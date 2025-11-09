import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import BottomButton from "../../auth/components/BottomButton";
import ScreenHeader from "../../auth/components/ScreenHeader";
import EmailInput from "../components/EmailInput";
import FooterLink from "../components/FooterLink";
import TitleSubtitle from "../components/TittleSubtitle";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  
  const handleContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return;
    }
    router.push("/auth/forgotPassword/verify-code");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <ScreenHeader
              title="Recuperar contraseña"
              imageUri="https://drive.google.com/uc?export=download&id=1eRpTB7RXIo8iqv8J1Q5sZr8bkiylwlt3"
              onBack={() => router.push("/auth/login")}
            />

            <TitleSubtitle
              title="¿Olvidaste tu contraseña?"
              subtitle="¡No pasa nada! Ingresa tu correo electrónico para restablecer la contraseña"
            />

            <EmailInput value={email} onChangeText={setEmail} />

            <FooterLink
              question="¿No tienes una cuenta?"
              actionText="Registrarse"
              linkTo="/auth/register/registerstep1"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <BottomButton onPress={handleContinue} text="Continuar" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  content: {
    flexGrow: 1,
  },
  inputBlock: {
    marginTop: 20,
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
