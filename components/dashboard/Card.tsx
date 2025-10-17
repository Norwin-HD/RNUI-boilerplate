import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E1EBFD',
    borderColor: '#0B4FD0',
    borderRadius: moderateScale(18),
    borderWidth: 1,
    paddingVertical: verticalScale(20),
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5,
    marginBottom: verticalScale(24),
  },
});

export default Card;
