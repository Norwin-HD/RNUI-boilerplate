import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const Footer: React.FC = () => {
  return (
    <View style={styles.quickButtonsRow}>
      <TouchableOpacity style={styles.quickButtonPrimary}>
        <Text style={styles.quickButtonPrimaryText}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickButtonsRow: {
    flexDirection: "row",
    position: "sticky",
    justifyContent: "space-evenly",
    gap: moderateScale(12),
    marginTop: moderateScale(16),
  },
  quickButtonPrimary: {
    backgroundColor: "#016EED",
    paddingHorizontal: moderateScale(123),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(8),
  },
  quickButtonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Footer;
