import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  name?: string;
  lastName?: string;
  email?: string;
}

const ProfileCard: React.FC<Props> = ({ name = "Usuario", lastName = "", email = "correo@ejemplo.com" }) => (
  <View style={styles.profileCard}>
    <View style={styles.avatar}>
      <Text style={styles.avatarLetter}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
    <View style={styles.userInfo}>
      <Text style={styles.name}>{`${name} ${lastName}`}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(30),
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: 30,
    backgroundColor: "#D6E4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: {
    fontSize: moderateScale(26),
    color: "#3D5AFE",
    fontWeight: "600",
  },
  userInfo: {
    marginLeft: scale(15),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#1C1C1C",
  },
  email: {
    fontSize: moderateScale(13),
    color: "#828282",
  },
});

export default ProfileCard;
