import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

// spent: Cuanto has gastado
// budget: Tu presupuesto total

interface ExpensesCardProps {
  spent: number;
  budget: number;
}

const ExpensesCard: React.FC<ExpensesCardProps> = ({ spent, budget }) => {
  const percentage = budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Gastos vs. Presupuesto"}</Text>
      <View style={styles.secondContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]}></View>
        </View>
        <Text style={styles.percentageText}>{`${percentage}%`}</Text>
      </View>
      <Text style={styles.amountText}>{`$${spent} de $${budget}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3476F4",
    borderRadius: moderateScale(18),
    padding: moderateScale(16),
    boxShadow: "0 0 0 2px #000 inset, 4px 4px 0 0 #000",
  },
  headerText: {
    color: "#FFFFFF",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(14),
    marginBottom: verticalScale(4),
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(4),
  },
  progressBarContainer: {
    flex: 1,
    height: verticalScale(10),
    backgroundColor: "#C2CAF2",
    borderRadius: 9999,
    marginRight: scale(8),
    overflow: 'hidden',
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#32DE83",
    borderColor: "#1FC16B",
    borderRadius: 9999,
    borderWidth: 1,
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_600SemiBold",
  },
  amountText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default ExpensesCard;
