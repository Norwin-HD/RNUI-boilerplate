import React from "react";
import { Text, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const ProfileHeader = () => (
  <Text style={styles.header}>Mi Perfil</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: moderateScale(22),
    fontWeight: "600",
    color: "#1C1C1C",
    marginBottom: verticalScale(25),
  },
});

export default ProfileHeader;
