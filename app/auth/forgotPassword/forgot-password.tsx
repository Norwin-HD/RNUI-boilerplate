import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  KeyboardEvent,
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null); // mensaje del modal

  useEffect(() => {
    const showSub = Keyboard.addListener(
      "keyboardDidShow",
      (e: KeyboardEvent) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleContinue = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
    const invalidDomains = [
      "gnail.com",
      "gamil.com",
      "gmaill.com",
      "hotmial.com",
      "yaho.com",
    ];
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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Recuperar contraseña"
          imageUri="https://ik.imagekit.io/nwogrqfzj/new-message.png?updatedAt=1762808561522"
          onBack={() => router.push("/auth/login")}
        />

        <TitleSubtitle
          title="¿Olvidaste tu contraseña?"
          subtitle="¡No pasa nada! Ingresa tu correo electrónico para restablecer la contraseña"
          titleStyle={{ fontSize: scale(20), marginBottom: verticalScale(8) }}
          subtitleStyle={{ fontSize: scale(14), lineHeight: verticalScale(20) }}
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
      </ScrollView>

      <View
        style={[styles.bottomButtonWrapper, { marginBottom: keyboardHeight }]}
      >
        <BottomButton onPress={handleContinue} text="Continuar" />
      </View>

      <AlertModal
        visible={!!modalMessage}
        message={modalMessage}
        onClose={() => setModalMessage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(20),
  },
  bottomButtonWrapper: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(0),
    backgroundColor: "#FFFFFF",
  },
});
