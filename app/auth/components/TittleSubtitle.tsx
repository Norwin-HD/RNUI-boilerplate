import React from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

interface TitleSubtitleProps {
  title: string;
  subtitle?: string;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
}) => {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { fontFamily: "Montserrat_700Bold" }, titleStyle]}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            { fontFamily: "Montserrat_500Medium" },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default TitleSubtitle;

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(10),
    alignItems: "center",
  },
  title: {
    fontSize: scale(20),
    color: "#111827",
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: scale(12),
    color: "#6B7280",
    textAlign: "center",
    lineHeight: verticalScale(18),
  },
});