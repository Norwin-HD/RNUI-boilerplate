import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Autenticación (temporal)</Text>
      <Button
        title="Ir al Home"
        onPress={() => router.replace("/home")} // reemplaza la pantalla actual
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
