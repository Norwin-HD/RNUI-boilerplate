import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backWrap} onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3476F4",
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backWrap: { width: 40, height: 32, justifyContent: "center" },
  backArrow: { color: "#fff", fontSize: 20, fontWeight: "600" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
