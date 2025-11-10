import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Keyboard,
  KeyboardEvent,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import EmailInput from "../components/EmailInput";
import FooterLink from "../components/FooterLink";
import Header from "../components/Header";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import SocialLogin from "../components/SocialLogin";
import StepDots from "../components/Stepdots";
import TitleSubtitle from "../components/TittleSubtitle";

export default function RegisterEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height - (Platform.OS === "ios" ? 20 : 0));
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    router.push("/auth/register/registersucces");
  };

  return (
    <View style={styles.container}>
      <Header title="Crear cuenta" onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <TitleSubtitle
          title="¡Bienvenido a Kovara!"
          subtitle="Ingresa tu correo y crea una contraseña para registrarte con nosotros"
          titleStyle={{
            fontSize: moderateScale(20),
            marginBottom: verticalScale(8),
          }}
          subtitleStyle={{
            fontSize: moderateScale(13),
            lineHeight: verticalScale(18),
          }}
        />

        <EmailInput value={email} onChangeText={setEmail} />

        <PasswordInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          showConfirm
          confirmValue={confirmPassword}
          onChangeConfirm={setConfirmPassword}
        />

        <View style={{ height: verticalScale(4) }} />

        <PrimaryButton title="Crear cuenta" onPress={handleRegister} />

        <StepDots activeIndex={1} total={3} />

        <SocialLogin />
        <FooterLink
          question="¿Ya tienes una cuenta?"
          actionText="Iniciar sesión"
          linkTo="/auth/login"
        />

        <View style={{ height: verticalScale(10) }} />
      </ScrollView>

      <View
        style={[
          styles.bottomButtonWrapper,
          { marginBottom: Platform.OS === "android" ? keyboardHeight : 0 },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3476F4",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    marginTop: verticalScale(10),
    borderTopLeftRadius: scale(18),
    borderTopRightRadius: scale(18),
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(24),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.06,
    shadowRadius: scale(6),
    elevation: 6,
  },
  bottomButtonWrapper: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});
