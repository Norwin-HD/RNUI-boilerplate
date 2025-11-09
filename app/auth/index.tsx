import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>

      <Image
        source={{
          uri: "https://drive.google.com/uc?export=download&id=1GmR8C-WIZoMPiOJloUNxayKE_o8LCvB8",
        }}
        style={styles.image}
        resizeMode="contain"
      />


      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>Empieza ahora!</Text>
        <Text style={styles.bottomSubtitle}>
          Cada peso cuenta, y tú decides cómo usarlo.
        </Text>
        <Text style={styles.bottomSubtitle}>
          Organiza tu dinero, controla tus gastos y haz crecer tus ahorros con
          una app que entiende tus metas.
        </Text>


        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000",
    marginTop: 80,
    marginBottom: 20,
  },
  image: {
    width: 420,
    height: 270,
    marginBottom: 20,
  },
  bottomContainer: {
    backgroundColor: "#3476F4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    paddingTop: 25,
    paddingBottom: 50,
    paddingHorizontal: 25,
    position: "absolute",
    bottom: 0,
  },
  bottomTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
  },
  bottomSubtitle: {
    color: "#E5E7EB",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#3476F4",
    fontSize: 16,
    fontWeight: "600",
  },
});
