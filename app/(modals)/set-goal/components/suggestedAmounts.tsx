import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface SuggestedAmountsProps {
  onSelect?: (amount: number) => void;
}

const AMOUNTS = [120, 300, 600, 1200];

const SuggestedAmounts = ({ onSelect }: SuggestedAmountsProps) => {
  return (
    <View style={styles.container}>
      {AMOUNTS.map((v) => (
        <TouchableOpacity
          key={v}
          style={styles.badge}
          onPress={() => onSelect && onSelect(v)}
          accessibilityRole="button"
          accessibilityLabel={`Sugerido ${v}`}
        >
          <Text style={styles.badgeText}>${v}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: scale(12),
    alignItems: 'center',
    paddingVertical: verticalScale(4),
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#e1ebfd',
    borderColor: '#9fbffa',
    borderWidth: 1,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(9999),
    minHeight: verticalScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#3476f4',
    fontSize: moderateScale(16),
    lineHeight: verticalScale(24),
  },
});

export default SuggestedAmounts;
