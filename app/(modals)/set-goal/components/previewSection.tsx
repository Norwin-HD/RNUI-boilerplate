import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

interface PreviewSectionProps {
  currentAmount: number;
  totalAmount: number;
}

const PreviewSection = ({ currentAmount, totalAmount }: PreviewSectionProps) => {
  const percent = Math.round((currentAmount / totalAmount) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vista previa</Text>
      <View style={styles.row}>
        <Text style={styles.leftText}>${currentAmount.toLocaleString()} de ${totalAmount.toLocaleString()}</Text>
        <Text style={styles.rightText}>{percent}% completado!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(8),
  },
  title: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: moderateScale(16),
    color: '#181a2a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: moderateScale(14),
    color: '#181a2a',
  },
  rightText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: moderateScale(16),
    color: '#181a2a',
  },
});

export default PreviewSection;
