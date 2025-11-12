import ArrowCircleDown from "@/assets/svg/arrow-down";
import ArrowCircleUp from "@/assets/svg/arrow-up";
import { useTransactions } from "@/src/stores/transactions/transactions-context";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface InfoCardProps {
  type: "income" | "expense";
  amount: number;
}

const InfoCard = ({ type, amount }: InfoCardProps) => {
  const isIncome = type === "income";
  const title = isIncome ? "Ingresos" : "Gastos";

  const amountStr = `$${amount.toFixed(2)}`;
  const getFontSize = (text: string) => {
    if (text.length > 12) return moderateScale(14);
    if (text.length > 10) return moderateScale(16);
    return moderateScale(19);
  };

  const fontSize = getFontSize(amountStr);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        {isIncome ? (
          <ArrowCircleUp
            width={moderateScale(45)}
            height={moderateScale(45)}
            color="#FFFFFF"
          />
        ) : (
          <ArrowCircleDown
            width={moderateScale(45)}
            height={moderateScale(45)}
            color="#FFFFFF"
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text
          style={[styles.cardAmount, { fontSize }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {amountStr}
        </Text>
      </View>
    </View>
  );
};

const IncomeExpenses: React.FC = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.monto, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.monto), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Gastos e Ingresos"}</Text>
      <View style={styles.cardsWrapper}>
        <InfoCard type="expense" amount={totalExpenses} />
        <InfoCard type="income" amount={totalIncome} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
    marginBottom: verticalScale(32),
  },
  headerText: {
    color: "#000000",
    fontSize: moderateScale(18),
    marginBottom: verticalScale(28),
    fontFamily: "Montserrat_500Medium",
  },
  cardsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: scale(26),
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  iconContainer: {
    marginRight: scale(12),
    backgroundColor: "#3476F4",
    borderRadius: moderateScale(25),
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    color: "#181A2A",
    lineHeight: verticalScale(18),
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_500Medium",
    marginBottom: verticalScale(4),
  },
  cardAmount: {
    color: "#181A2A",
    lineHeight: verticalScale(28),
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default IncomeExpenses;
