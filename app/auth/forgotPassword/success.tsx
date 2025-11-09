import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import TitleSubtitle from "../components/TittleSubtitle";


export default function SuccessResetScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth/login");
  };
  

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?export=download&id=1UIVwhtkh9su4BgfAwAh9QTlWml0K7Scd",
          }}
          style={styles.image}
        />

        <TitleSubtitle
          title="¡Felicidades!"
          subtitle="Tu contraseña ha sido reestablecida con éxito"
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonArrow}>→</Text>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 270,
    height: 270,
    resizeMode: "contain",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3476F4",
    borderRadius: 12,
    paddingVertical: 14,
    paddingRight: 50,
    width: "100%",
    shadowColor: "#2B79FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 40,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 6,
  },
});
