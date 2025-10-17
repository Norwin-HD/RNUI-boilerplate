import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Tabs: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonMain}
        onPress={() => alert("Pressed!")}
      >
        <Text style={styles.textMain}>{"Todas"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecond}
        onPress={() => alert("Pressed!")}
      >
        <Text style={styles.textSecond}>{"Transacciones"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecond}
        onPress={() => alert("Pressed!")}
      >
        <Text style={styles.textSecond}>{"Metas"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: scale(2),
    marginBottom: verticalScale(20),
  },
  buttonMain: {
    backgroundColor: "#3476F4",
    borderRadius: 9999,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(12),
    marginRight: scale(10),
  },
  textMain: {
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_600SemiBold",
  },
  buttonSecond: {
    backgroundColor: "#E1EBFD",
    borderColor: "#9FBFFA",
    borderRadius: 9999,
    borderWidth: 1,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(12),
    marginRight: scale(15),
  },
  textSecond: {
    color: "#3476F4",
    fontSize: moderateScale(15),
    fontFamily: "Montserrat_700Bold",
  },
});

export default Tabs;
