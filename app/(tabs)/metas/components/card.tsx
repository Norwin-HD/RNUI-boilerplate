import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E1EBFD",
    borderColor: "#0B4FD0",
    borderRadius: moderateScale(18),
    borderWidth: 1,
    paddingVertical: verticalScale(13),
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5,
    marginBottom: verticalScale(10),
  },
});

export default Card;
