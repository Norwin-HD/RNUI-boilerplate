import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText";

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backWrap} onPress={onBack}>
          <Ionicons name="arrow-back" size={scale(22)} color="#fff" />
        </TouchableOpacity>
      )}
      <AppText variant="bold" style={styles.headerTitle}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3476F4",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(0),
    paddingHorizontal: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  backWrap: { 
    width: scale(50), 
    height: verticalScale(30), 
    justifyContent: "center", 
    alignItems: "center",
  },
  headerTitle: { 
    color: "#fff", 
    fontSize: scale(16), 
    marginLeft: scale(2),
  },
});
