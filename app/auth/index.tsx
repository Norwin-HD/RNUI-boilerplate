import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { router } from "expo-router";


import AppText from "../auth/components/AppText"; 

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <AppText variant="bold" style={styles.title}>
        ¡Bienvenido!
      </AppText>

      <Image
        source={{
          uri: "https://ik.imagekit.io/nwogrqfzj/welcome.png?updatedAt=1762808211850",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.bottomContainer}>
        <AppText variant="bold" style={styles.bottomTitle}>
          Empieza ahora!
        </AppText>
        <AppText variant="medium" style={styles.bottomSubtitle}>
          Cada peso cuenta, y tú decides cómo usarlo.
        </AppText>
        <AppText variant="medium" style={styles.bottomSubtitle}>
          Organiza tu dinero, controla tus gastos y haz crecer tus ahorros con
          una app que entiende tus metas.
        </AppText>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => router.push("/auth/login")}
        >
          <AppText variant="bold" style={styles.buttonText}>
            Iniciar sesión
          </AppText>
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
    fontSize: scale(25),
    color: "#000",
    marginTop: verticalScale(80),
    marginBottom: verticalScale(0),
  },
  image: {
    width: scale(360),
    height: verticalScale(270),
    marginBottom: verticalScale(20),
  },
  bottomContainer: {
    backgroundColor: "#3476F4",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    width: "100%",
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(25),
    position: "absolute",
    bottom: 0,
  },
  bottomTitle: {
    color: "#fff",
    fontSize: scale(20),
    marginBottom: verticalScale(20),
  },
  bottomSubtitle: {
    color: "#E5E7EB",
    fontSize: scale(14),
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(15),
  },
  buttonPrimary: {
    backgroundColor: "#fff",
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },
  buttonText: {
    color: "#3476F4",
    fontSize: scale(14),
  },
});