
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { moderateScale, scale, verticalScale} from "react-native-size-matters";
import ArrowSmallLeft from "../../transacciones/svg/arrow-small-left";

const Header = () => {

    const title = "Metas & Presupuestos";

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <ArrowSmallLeft width={24} height={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
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