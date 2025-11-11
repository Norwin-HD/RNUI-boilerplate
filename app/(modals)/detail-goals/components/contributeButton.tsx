import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface ContributeButtonProps {
  onPress?: () => void;
}

const ContributeButton = ({ onPress }: ContributeButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Aportar a Meta</Text>
      <Ionicons name="add" size={moderateScale(16)} color="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1FC16B",
    borderColor: "#adf2cd",
    borderWidth: 2,
    borderRadius: moderateScale(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(8),
  },
  buttonText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
    color: "#ffffff",
    lineHeight: verticalScale(21),
  },
});

export default ContributeButton;