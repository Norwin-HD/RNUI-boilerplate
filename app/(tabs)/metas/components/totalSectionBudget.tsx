import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

interface TotalPresupuestoProps {
  BudgetAll: number;
  ExpensesGoal: number;
}

export default function TotalPresupuesto({ BudgetAll, ExpensesGoal }: TotalPresupuestoProps) {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const BudgetAllInteger = Math.floor(BudgetAll);
  const BudgetAllDecimal = (BudgetAll % 1).toFixed(2).substring(2);

  const ExpensesGoalInteger = Math.floor(ExpensesGoal);
  const ExpensesGoalDecimal = (ExpensesGoal % 1).toFixed(2).substring(2);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Presupuesto Total
          </Text>
          <Text>
            <Text style={styles.amount}>${formatNumber(BudgetAllInteger)}</Text>
            <Text style={styles.decimal}>.{BudgetAllDecimal}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Gasto Total
          </Text>
          <Text>
            <Text style={styles.amount}>${formatNumber(ExpensesGoalInteger)}</Text>
            <Text style={styles.decimal}>.{ExpensesGoalDecimal}</Text>
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
    fontSize: scale(12),
    lineHeight: 18,
  },
  amount: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: scale(29),
    lineHeight: 51,
  },
  decimal: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: scale(20),
    lineHeight: 20,
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: '#D1D5DB', 
  },
});
