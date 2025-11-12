import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color?: string;
  onPress: () => void;
  showBorder?: boolean;
}

const ProfileOption: React.FC<Props> = ({ icon, text, color = "#5A5A5A", onPress, showBorder = true }) => (
  <TouchableOpacity style={[styles.option, !showBorder && styles.noBorder]} onPress={onPress}>
    <Ionicons name={icon} size={24} color={color} />
    <Text style={[styles.text, { color }]}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color={color === "#E74C3C" ? "#E74C3C" : "#BDBDBD"} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  text: {
    flex: 1,
    fontSize: moderateScale(15),
    marginLeft: scale(10),
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});

export default ProfileOption;
