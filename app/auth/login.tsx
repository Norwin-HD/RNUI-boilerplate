import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { account } from "@/src/lib/appwrite";
import { traducirErrorAppwrite } from "@/src/lib/appwriteErrors";

import FooterLink from "../auth/components/FooterLink";
import Header from "../auth/components/Header";
import PasswordInput from "../auth/components/PasswordInput";
import SocialLogin from "../auth/components/SocialLogin";
import EmailInput from "./components/EmailInput";
import AppText from "../auth/components/AppText";
import AlertModal from "../auth/components/AlertModal";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
    const invalidDomains = [
      "gnail.com",
      "gamil.com",
      "gmaill.com",
      "hotmial.com",
      "yaho.com",
    ];
    const domain = email.split("@")[1];

    if (!email || !password) {
      setModalMessage("Por favor ingresa correo y contraseña.");
      return;
    }

    if (!emailRegex.test(email) || invalidDomains.includes(domain)) {
      setModalMessage("Por favor ingresa un correo válido.");
      return;
    }

    try {
      setLoading(true);

      // Cierra sesión previa si existe
      try {
        await account.deleteSession("current");
      } catch {
        console.log("No había sesión activa, continuando...");
      }

      if (loading) return;
      setLoading(true);

      // Inicia sesión
      await account.createEmailPasswordSession(email, password);

      router.push("/(tabs)/home");
    } catch (error) {
      const mensaje = traducirErrorAppwrite(error);
      setModalMessage(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Iniciar Sesión" onBack={() => router.back()} />

      <ScrollView
        style={styles.card}
        contentContainerStyle={{ paddingBottom: verticalScale(50) }}
      >
        <AppText variant="bold" style={styles.cardTitle}>
          ¡Bienvenido de Nuevo!
        </AppText>

        <AppText variant="medium" style={styles.cardSubtitle}>
          Ingresa tu correo y contraseña y vuelve con nosotros
        </AppText>

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
          <AppText variant="medium" style={styles.forgot}>
            ¿Olvidaste tu contraseña?
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <AppText variant="bold" style={styles.primaryButtonText}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </AppText>
        </TouchableOpacity>

        <SocialLogin />

        <FooterLink
          question="¿No tienes una cuenta?"
          actionText="Registrarse"
          linkTo="/auth/register/registerstep1"
        />
      </ScrollView>

      <AlertModal
        visible={!!modalMessage}
        message={modalMessage}
        onClose={() => setModalMessage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#3476F4" },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: verticalScale(10),
    borderTopLeftRadius: scale(18),
    borderTopRightRadius: scale(18),
    paddingTop: verticalScale(48),
    paddingHorizontal: scale(24),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(3) },
    shadowOpacity: 0.06,
    shadowRadius: scale(6),
    elevation: 6,
  },
  cardTitle: {
    fontSize: scale(22),
    textAlign: "center",
    color: "#111827",
    marginBottom: verticalScale(10),
  },
  cardSubtitle: {
    fontSize: scale(14),
    color: "#6B7280",
    textAlign: "center",
    marginBottom: verticalScale(30),
    lineHeight: verticalScale(22),
  },
  forgot: {
    textAlign: "right",
    color: "#3476F4",
    fontSize: scale(12),
    marginBottom: verticalScale(20),
  },
  primaryButton: {
    backgroundColor: "#3476F4",
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.25,
    shadowRadius: scale(4),
    elevation: 4,
    marginBottom: verticalScale(10),
  },
  primaryButtonText: { fontSize: scale(16), color: "#fff" },
});
