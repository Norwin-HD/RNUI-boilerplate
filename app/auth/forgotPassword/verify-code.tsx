import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BottomButton from "../../auth/components/BottomButton";
import ScreenHeader from "../../auth/components/ScreenHeader";


export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

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
      alert("Por favor ingresa el código completo");
      return;
    }
    router.push("/auth/forgotPassword/reset-password");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.content}>
            <ScreenHeader
              title="Ingresar código"
              imageUri="https://drive.google.com/uc?export=download&id=1XMZefUKNZbd_ywfNTJl7U8R9ZQohh4K9"
            />

            <View style={styles.textBlock}>
              <Text style={styles.title}>Ingresa el código</Text>
              <Text style={styles.subtitle}>
                Hemos enviado un código de verificación a{"\n"}
                <Text style={{ fontWeight: "600" }}>
                  tu correo aaron*****@gmail.com
                </Text>
              </Text>
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

            <Text style={styles.resendText}>
              ¿No lo has recibido?{" "}
              <Text
                style={styles.resendLink}
                onPress={() => alert("Código reenviado")}
              >
                Enviar de nuevo
              </Text>
            </Text>
          </View>
        </ScrollView>

        <BottomButton onPress={handleContinue} text="Continuar" />
      </KeyboardAvoidingView>
    </View>
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
  textBlock: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    paddingTop: 14,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    paddingTop: 8,
    lineHeight: 18,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
    gap: 14,
  },
  codeInput: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  resendText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 20,
  },
  resendLink: {
    color: "#3476F4",
    fontWeight: "700",
  },
});
