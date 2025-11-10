import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText";

interface SocialLoginProps {
  onGooglePress?: () => void;
  onMicrosoftPress?: () => void;
  onFacebookPress?: () => void;
}

export default function SocialLogin({
  onGooglePress,
  onMicrosoftPress,
  onFacebookPress,
}: SocialLoginProps) {
  return (
    <>
      <View style={styles.separatorRow}>
        <View style={styles.sepLine} />
        <AppText variant="medium" style={styles.sepText}>
          O inicia con
        </AppText>
        <View style={styles.sepLine} />
      </View>

      <View style={styles.socialRow}>
        <View style={styles.socialSpacer} />

        <TouchableOpacity style={styles.socialBox} onPress={onGooglePress}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBox} onPress={onMicrosoftPress}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBox} onPress={onFacebookPress}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <View style={styles.socialSpacer} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: verticalScale(8),
  },
  sepLine: {
    height: verticalScale(2),
    backgroundColor: "#E5E7EB",
    flex: 1,
    marginHorizontal: scale(8),
  },
  sepText: {
    color: "#9CA3AF",
    fontSize: scale(12),
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(28),
    marginBottom: verticalScale(6),
  },
  socialBox: {
    width: scale(45),
    height: verticalScale(42),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: scale(3),
    elevation: 2,
  },
  socialIcon: {
    width: scale(24),
    height: verticalScale(24),
    resizeMode: "contain",
  },
  socialSpacer: {
    width: scale(4),
  },
});
