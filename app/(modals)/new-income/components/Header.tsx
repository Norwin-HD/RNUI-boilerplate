import ArrowSmallLeft from "@/app/(tabs)/transacciones/svg/arrow-small-left";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <ArrowSmallLeft width={24} height={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>Nuevo Ingreso</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  button: {
    padding: scale(5),
    paddingLeft: scale(16),
  },
  title: {
    color: "#FFFFFF",
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_700Bold",
    marginLeft: scale(15),
  },
});

export default Header;
