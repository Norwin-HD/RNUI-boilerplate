import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <Text style={styles.sepText}>O inicia con</Text>
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
    marginVertical: 20,
  },
  sepLine: {
    height: 2,
    backgroundColor: "#E5E7EB",
    flex: 1,
    marginHorizontal: 8,
  },
  sepText: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginBottom: 16,
  },
  socialBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  socialIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  socialSpacer: {
    width: 4,
  },
});
