import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardEvent,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import BottomButton from "../../auth/components/BottomButton";
import ScreenHeader from "../../auth/components/ScreenHeader";
import EmailInput from "../components/EmailInput";
import FooterLink from "../components/FooterLink";
import TitleSubtitle from "../components/TittleSubtitle";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Recuperar contraseña"
          imageUri="https://drive.google.com/uc?export=download&id=1eRpTB7RXIo8iqv8J1Q5sZr8bkiylwlt3"
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
          style={{ marginTop: verticalScale(10), marginBottom: verticalScale(20) }}
        />

        <FooterLink
          question="¿No tienes una cuenta?"
          actionText="Registrarse"
          linkTo="/auth/register/registerstep1"
        />
      </ScrollView>

      <View style={[styles.bottomButtonWrapper, { marginBottom: keyboardHeight }]}>
        <BottomButton onPress={handleContinue} text="Continuar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
