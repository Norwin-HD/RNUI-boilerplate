import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText"; 

interface ScreenHeaderProps {
  title: string;
  imageUri: string;
  onBack?: () => void;
}

export default function ScreenHeader({ title, imageUri, onBack }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack ? onBack : () => router.back()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={scale(25)} color="#111827" />
        </TouchableOpacity>

        <AppText variant="bold" style={styles.headerTitle}>
          {title}
        </AppText>
      </View>

      <View style={styles.imageWrap}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(2),
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(4),
  },
  backBtn: {
    marginRight: scale(10),
    width: scale(20),
    height: verticalScale(25),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: scale(16),
    color: "#111827",
  },
  imageWrap: {
    alignItems: "center",
    marginTop: verticalScale(0),
  },
  image: {
    width: scale(250),
    height: verticalScale(250),
    resizeMode: "contain",
  },
});
