import React from "react";
import { Text, TextProps, TextStyle } from "react-native";


interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: "regular" | "medium" | "semiBold" | "bold";
  style?: TextStyle;
}

export default function AppText({
  children,
  variant = "regular",
  style,
  ...props
}: AppTextProps) {
  let fontFamily = "Montserrat_400Regular";

  switch (variant) {
    case "medium":
      fontFamily = "Montserrat_500Medium";
      break;
    case "semiBold":
      fontFamily = "Montserrat_600SemiBold";
      break;
    case "bold":
      fontFamily = "Montserrat_700Bold";
      break;
  }

  return (
    <Text style={[{ fontFamily }, style]} {...props}>
      {children}
    </Text>
  );
}
