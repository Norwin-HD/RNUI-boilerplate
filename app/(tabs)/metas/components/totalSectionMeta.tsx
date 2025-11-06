import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface TotalMetaProps {
  savingAll: number;
  allGoal: number;
}

export default function TotalMeta({ savingAll, allGoal }: TotalMetaProps) {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const savingAllInteger = Math.floor(savingAll);
  const savingAllDecimal = (savingAll % 1).toFixed(2).substring(2);

  const allGoalInteger = Math.floor(allGoal);
  const allGoalDecimal = (allGoal % 1).toFixed(2).substring(2);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Total Ahorrado
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={1}>
            <Text style={styles.amount}>${formatNumber(savingAllInteger)}</Text>
            <Text style={styles.decimal}>.{savingAllDecimal}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Meta Total
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={1}>
            <Text style={styles.amount}>${formatNumber(allGoalInteger)}</Text>
            <Text style={styles.decimal}>.{allGoalDecimal}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    boxSizing: 'border-box',
    flexDirection: 'row',
    gap: scale(10),
    marginTop: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(16),
    borderRadius: scale(18),
  },
  section: {
    flexBasis: 0,
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#181a2a',
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
  amount: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: moderateScale(45),
    lineHeight: verticalScale(51),
  },
  decimal: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: moderateScale(20),
    lineHeight: verticalScale(20),
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: '#D1D5DB', 
  },
});
