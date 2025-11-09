import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FooterLink from "../auth/components/FooterLink";
import Header from "../auth/components/Header";
import PasswordInput from "../auth/components/PasswordInput";
import SocialLogin from "../auth/components/SocialLogin";
import EmailInput from "./components/EmailInput";


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert("Por favor ingresa correo y contraseña.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.screen}>
      <Header title="Iniciar Sesión" onBack={() => router.back()} />

      <ScrollView
        style={styles.card}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Text style={styles.cardTitle}>¡Bienvenido de Nuevo!</Text>
        <Text style={styles.cardSubtitle}>
          Ingresa tu correo y contraseña y vuelve con nosotros
        </Text>

        <EmailInput value={email} onChangeText={setEmail} />

        <PasswordInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          showConfirm={false}
        />

        <TouchableOpacity
          onPress={() => router.push("/auth/forgotPassword/forgot-password")}
        >
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <SocialLogin />

        <FooterLink
          question="¿No tienes una cuenta?"
          actionText="Registrarse"
          linkTo="/auth/register/registerstep1"
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
    paddingTop: 68,
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
    marginBottom: 15,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111827",
    marginBottom: 12,
  },
  forgot: {
    textAlign: "right",
    color: "#3476F4",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#3476F4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
