import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import TitleSubtitle from "../components/TittleSubtitle";
import BottomButton from "../components/BottomButton";

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
            uri: "https://ik.imagekit.io/nwogrqfzj/Confirmed.png?updatedAt=1762808915461",
          }}
          style={styles.image}
        />

        <TitleSubtitle
          title="¡Felicidades!"
          subtitle="Tu contraseña ha sido reestablecida con éxito"
          titleStyle={{ fontSize: scale(22), marginBottom: verticalScale(8) }}
          subtitleStyle={{
            fontSize: scale(14),
            lineHeight: verticalScale(20),
            textAlign: "center",
          }}
        />

        <View style={styles.buttonWrapper}>
          <BottomButton text="Iniciar Sesión" onPress={handleContinue} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: scale(240),
    height: verticalScale(240),
    resizeMode: "contain",
    marginBottom: verticalScale(24),
  },
  buttonWrapper: {
    marginTop: verticalScale(40),
    width: "100%",
  },
});