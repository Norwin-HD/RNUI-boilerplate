import React from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

interface TitleSubtitleProps {
  title: string;
  subtitle?: string;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({ title, subtitle, titleStyle, subtitleStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
    </View>
  );
};

export default TitleSubtitle;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
