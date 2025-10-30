import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface FooterProps {
  onApply: () => void;
  onClear: () => void;
}

const Footer: React.FC<FooterProps> = ({ onApply, onClear }) => {
  return (
    <View style={styles.quickButtonsRow}>
      <TouchableOpacity style={styles.quickButtonLight} onPress={onClear}>
        <Text style={styles.quickButtonLightText}>Limpiar todo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickButtonPrimary} onPress={onApply}>
        <Text style={styles.quickButtonPrimaryText}>Aplicar filtros</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: moderateScale(12),
    marginTop: moderateScale(16),
  },
  quickButtonLight: {
    backgroundColor: "#DDECFD",
    borderWidth: 1,
    borderColor: "#9fbffa",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  quickButtonLightText: {
    color: "#016EED",
    fontFamily: "Montserrat_600SemiBold",
  },
  quickButtonPrimary: {
    backgroundColor: "#016EED",
    paddingHorizontal: moderateScale(45),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  quickButtonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Footer;
