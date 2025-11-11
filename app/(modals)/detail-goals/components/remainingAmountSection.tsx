import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface RemainingAmountSectionProps {
  remainingAmount: number;
}

const RemainingAmountSection = ({ remainingAmount }: RemainingAmountSectionProps) => {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const integerPart = Math.floor(remainingAmount);
  const decimalPart = ((remainingAmount % 1) * 100).toFixed(0);

  return (
    <View style={styles.container}>
      <View style={styles.amountInput}>
        <Text style={styles.dollarSign}>$</Text>
        <Text style={styles.amount}>
          {formatNumber(integerPart)}.{decimalPart}
        </Text>
      </View>
      <Text style={styles.label}>monto restante</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: scale(8),
  },
  amountInput: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: verticalScale(48),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(12),
  },
  dollarSign: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    color: "#3476f4",
    lineHeight: verticalScale(36),
  },
  amount: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(20),
    color: "#181a2a",
    lineHeight: verticalScale(20),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    color: "#181a2a",
    lineHeight: verticalScale(24),
  },
});

export default RemainingAmountSection;