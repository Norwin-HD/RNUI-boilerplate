
import React from "react";
import { View, StyleSheet, Text} from "react-native";
import { moderateScale, scale, verticalScale} from "react-native-size-matters";

const Header = () => {

    const title = "Metas & Presupuestos";

  return (
    <View style={styles.container}>
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
  title: {
    color: "#454A53",
    fontSize: moderateScale(22),
    fontFamily: "Montserrat_700Bold",
    marginLeft: scale(15),
  },
});


export default Header;