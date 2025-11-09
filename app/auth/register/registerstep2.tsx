import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
    <View style={styles.screen}>
      
      <Header title="Crear cuenta" onBack={() => router.back()} />

      <ScrollView
        style={styles.card}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <TitleSubtitle
          title="¡Bienvenido a Kovara!"
          subtitle="Ingresa tu correo y crea una contraseña para registrarte con nosotros"
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

        <PrimaryButton
          title="Crear cuenta"
          style={{ marginTop: 30 }}
          onPress={handleRegister}
        />

        <StepDots activeIndex={1} total={3} />

        <SocialLogin />

        <FooterLink
          question="¿Ya tienes una cuenta?"
          actionText="Iniciar sesión"
          linkTo="/auth/login"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#3476F4" },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 48,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#111827",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 18,
  },
});
