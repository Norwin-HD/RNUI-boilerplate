
import React from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import FieldComponent from "./fieldComponente";

export default function AddGoalContainer() {
  return (
    <View style={styles.container}>
          <FieldComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(32),
    bottom: 0,
    gap: verticalScale(32),
  },
});
