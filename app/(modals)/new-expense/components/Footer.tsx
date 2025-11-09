import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

interface FooterProps {
  onPress?: () => void;
}

const Footer = ({ onPress }: FooterProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom + moderateScale(8) },
      ]}
    >
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onPress || (() => router.dismiss())}
      >
        <Text style={styles.primaryButtonText}>Guardar nuevo Gasto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
    backgroundColor: "#ffffff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: "#016EED",
    borderRadius: moderateScale(12),
    height: moderateScale(48),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primaryButtonText: {
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
  },
});

export default Footer;
