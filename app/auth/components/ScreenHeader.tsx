import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
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
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backBtn: {
    marginRight: 8,
  },
  backArrow: {
    fontSize: 25,
    color: "#111827",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  imageWrap: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});
