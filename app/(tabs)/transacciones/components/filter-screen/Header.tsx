import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ArrowSmallLeft from "../../svg/arrow-small-left";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <ArrowSmallLeft width={24} height={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Filtrar transacciones</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(20),
    backgroundColor: "#FFFFFF",
  },
  button: {
    padding: scale(5),
  },
  title: {
    color: "#454A53",
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_700Bold",
    marginLeft: scale(15),
  },
});

export default Header;
