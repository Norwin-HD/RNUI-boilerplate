import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import StepDots from "../components/Stepdots";
import TitleSubtitle from "../components/TittleSubtitle";

export default function SuccessScreen() {
  const router = useRouter();

  
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://drive.google.com/uc?export=download&id=14oeh668L2feTEB6GGRwB32V4piMwtJyF",
        }}
        style={styles.image}
      />

      <TitleSubtitle
        title="¡Estás dentro! 🚀"
        subtitle="Todo empieza con un primer paso. 
Organiza tus finanzas, ahorra con propósito y alcanza tus metas personales."
      />

      <PrimaryButton
        title="Empezar Ahora"
        onPress={() => router.push("/auth/login")}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <StepDots activeIndex={2} total={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: "contain",
    marginBottom: 40,
  },
});
