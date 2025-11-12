import { useRouter, useLocalSearchParams } from "expo-router";
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
import { ID } from "appwrite";
import { account, databases } from "@/src/lib/appwrite";

import EmailInput from "../components/EmailInput";
import FooterLink from "../components/FooterLink";
import Header from "../components/Header";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import SocialLogin from "../components/SocialLogin";
import StepDots from "../components/Stepdots";
import TitleSubtitle from "../components/TittleSubtitle";
import AlertModal from "../components/AlertModal";

export default function RegisterEmailScreen() {
  const router = useRouter();
  const { nombre, apellido, ocupacion, fechaNacimiento } =
    useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      "keyboardDidShow",
      (e: KeyboardEvent) => {
        setKeyboardHeight(
          e.endCoordinates.height - (Platform.OS === "ios" ? 20 : 0)
        );
      }
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    console.log("Datos recibidos del paso anterior:", {
      nombre,
      apellido,
      ocupacion,
      fechaNacimiento,
    });
  }, [nombre, apellido, ocupacion, fechaNacimiento]);

  const handleRegister = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const invalidDomains = ["gnail.com","gamil.com","gmaill.com","gmail.co","gmail.con","gmail.cmo","gmal.com","gmial.com","gimail.com","gmaol.com","hotmial.com","hotmil.com","hotmai.com","hotmaill.com","hotmal.com","hotmalil.com","hotmali.com","homtail.com","hotmaol.com","hormail.com","outlok.com","outllok.com","outllok.es","outloo.com","outlook.co","outloook.com","outlok.es","outlok.con","yaho.com","yhoo.com","yahho.com","yaho.co","yahool.com","yahool.con","yaoo.com","yahoom.com","liv.com","live.co","live.con","live.cm","lve.com","gemail.com","hotnail.com","gmalil.com","gmil.com","gmil.co","gmial.co","gmaik.com"];
  const domain = email.split("@")[1];

  if (!email || !password || !confirmPassword) {
    setModalMessage("Por favor completa todos los campos.");
    return;
  }
  if (!emailRegex.test(email) || invalidDomains.includes(domain)) {
    setModalMessage("Por favor ingresa un correo válido.");
    return;
  }
  if (password.length < 6) {
    setModalMessage("La contraseña debe tener al menos 6 caracteres.");
    return;
  }
  if (password !== confirmPassword) {
    setModalMessage("Las contraseñas no coinciden.");
    return;
  }

  try {
    setLoading(true);

    // Cerrar sesión activa si la hubiera
    try {
      await account.deleteSession("current");
    } catch {
      console.log("No había sesión activa, continuando...");
    }

    // Crear usuario
    const newUser = await account.create(ID.unique(), email, password);

    // Iniciar sesión automáticamente
    await account.createEmailPasswordSession(email, password);

    // Guardar datos personales en la base de datos
    await databases.createDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!,
      ID.unique(),
      {
        name: nombre || "",
        last_name: apellido || "",
        occupation: ocupacion || "",
        dateBirth: fechaNacimiento || "",
        email,
        userId: newUser.$id,
      }
    );

    console.log("Usuario y perfil guardados correctamente.");
    router.push("/auth/register/registersucces");
  } catch (error: any) {
    console.error("Error al registrar:", error);

    if (error.code === 409) {
      setModalMessage("Ya existe una cuenta con este correo electrónico.");
    } else if (error.code === 401) {
      setModalMessage("No puedes crear una sesión mientras ya hay una activa.");
    } else {
      setModalMessage(error.message || "Error al crear la cuenta.");
    }
  } finally {
    setLoading(false);
  }
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

        <PrimaryButton
          title={loading ? "Creando cuenta..." : "Crear cuenta"}
          onPress={handleRegister}
        />

        <StepDots activeIndex={1} total={3} />

        <SocialLogin
          onLoginSuccess={(provider) =>
            setModalMessage(`¡Has iniciado sesión con ${provider}!`)
          }
        />

        <FooterLink
          question="¿Ya tienes una cuenta?"
          actionText="Iniciar sesión"
          linkTo="/auth/login"
        />
      </ScrollView>

      <View
        style={[
          styles.bottomButtonWrapper,
          { marginBottom: Platform.OS === "android" ? keyboardHeight : 0 },
        ]}
      />

      <AlertModal
        visible={!!modalMessage}
        message={modalMessage}
        onClose={() => setModalMessage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3476F4" },
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
  bottomButtonWrapper: { width: "100%", backgroundColor: "#FFFFFF" },
});
