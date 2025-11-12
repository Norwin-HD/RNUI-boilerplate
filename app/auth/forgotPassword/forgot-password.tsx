import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import BottomButton from "../../auth/components/BottomButton";
import ScreenHeader from "../../auth/components/ScreenHeader";
import EmailInput from "../components/EmailInput";
import FooterLink from "../components/FooterLink";
import TitleSubtitle from "../components/TittleSubtitle";
import AlertModal from "../../auth/components/AlertModal";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleContinue = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
    const invalidDomains = ["gnail.com","gamil.com","gmaill.com","gmail.co","gmail.con","gmail.cmo","gmal.com","gmial.com","gimail.com","gmaol.com","hotmial.com","hotmil.com","hotmai.com","hotmaill.com","hotmal.com","hotmalil.com","hotmali.com","homtail.com","hotmaol.com","hormail.com","outlok.com","outllok.com","outllok.es","outloo.com","outlook.co","outloook.com","outlok.es","outlok.con","yaho.com","yhoo.com","yahho.com","yaho.co","yahool.com","yahool.con","yaoo.com","yahoom.com","liv.com","live.co","live.con","live.cm","lve.com","gemail.com","hotnail.com","gmalil.com","gmil.com","gmil.co","gmial.co","gmaik.com"];

    const domain = email.split("@")[1];

    if (!email) {
      setModalMessage("Por favor, ingresa tu correo electrónico.");
      return;
    }
    if (!emailRegex.test(email) || invalidDomains.includes(domain)) {
      setModalMessage("Por favor ingresa un correo válido.");
      return;
    }

    router.push({
      pathname: "/auth/forgotPassword/verify-code",
      params: { email },
    });
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
          <View style={styles.content}>
            <ScreenHeader
              title="Recuperar contraseña"
              imageUri="https://ik.imagekit.io/nwogrqfzj/new-message.png?updatedAt=1762808561522"
              onBack={() => router.push("/auth/login")}
            />

            <TitleSubtitle
              title="¿Olvidaste tu contraseña?"
              subtitle="¡No pasa nada! Ingresa tu correo electrónico para restablecer la contraseña"
              titleStyle={{ fontSize: scale(20), marginBottom: verticalScale(8) }}
              subtitleStyle={{
                fontSize: scale(14),
                lineHeight: verticalScale(20),
              }}
            />

            <EmailInput
              value={email}
              onChangeText={setEmail}
              style={{
                marginTop: verticalScale(10),
                marginBottom: verticalScale(20),
              }}
            />

            <FooterLink
              question="¿No tienes una cuenta?"
              actionText="Registrarse"
              linkTo="/auth/register/registerstep1"
            />
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
    paddingBottom: verticalScale(0), 
  },
  content: { flexGrow: 1 },
});
