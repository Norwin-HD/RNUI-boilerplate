
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import BalanceCard from './BalanceCard';
import ExpensesCard from './ExpensesCard';

const FinancialSummary: React.FC = () => {
  return (
    <View style={styles.column4}>
      <BalanceCard />
      <ExpensesCard />
    </View>
  );
};

const styles = StyleSheet.create({
  column4: {
    backgroundColor: '#E1EBFD',
    borderColor: '#5E92F7',
    borderRadius: moderateScale(18),
    borderWidth: 1,
    paddingTop: verticalScale(16),
    marginBottom: verticalScale(32),
  },
});

export default FinancialSummary;
