import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ArrowDown from "../../../../assets/svg/arrow-down";
import ArrowUp from "../../../../assets/svg/arrow-up";
import { useBudgetCalculations } from "../../metas/hooks/use-budget-calcutation";

interface BalanceCardProps {
  period: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  period,
}) => {
  const { totalBudget, totalExpenses, overallProgress } = useBudgetCalculations();

  const balance = totalBudget - totalExpenses;
  const percentageChange = overallProgress;

  const formattedAmount = balance.toFixed(2).split(".");
  const integerPart = formattedAmount[0];
  const decimalPart = formattedAmount[1];

  const isPositiveChange = percentageChange < 100; // Positive if under budget

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Balance General"}</Text>
      <View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountInteger}>{`${integerPart}`}</Text>
          <Text style={styles.amountDecimal}>{`.${decimalPart}`}</Text>
        </View>
        <View style={styles.analysisContainer}>
          <View style={styles.iconContainer}>
            {isPositiveChange ? (
              <ArrowUp
                width={moderateScale(20)}
                height={moderateScale(20)}
                color="#1FC16B"
              />
            ) : (
              <ArrowDown
                width={moderateScale(20)}
                height={moderateScale(20)}
                color="#FB283A"
              />
            )}
          </View>
          <Text
            style={styles.analysisText}
          >{`${percentageChange.toFixed(1)}% ${period}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(19),
    marginHorizontal: scale(16),
  },
  title: {
    color: "#000000",
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: verticalScale(10),
  },
  amountContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: verticalScale(8),
  },
  amountInteger: {
    color: "#000000",
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(34),
  },
  amountDecimal: {
    color: "#000000",
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_500Medium",
    bottom: verticalScale(-10),
  },
  analysisContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(5),
  },
  iconContainer: {
    marginRight: scale(14),
  },
  analysisText: {
    color: "#000000",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
  },
});

export default BalanceCard;
