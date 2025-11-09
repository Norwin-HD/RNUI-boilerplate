import ArrowCircleDown from "@/app/(tabs)/transacciones/svg/arrow-circle-down";
import ArrowCircleUp from "@/app/(tabs)/transacciones/svg/arrow-circle-up";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import transaccionesMackup from "../../../../mockups/transactionsMockup";
import { useTransactionTotals } from "../../hooks/useTransactionTotals";

const IncomeExpenses = () => {
  const { totalIncome, totalExpenses } = useTransactionTotals(transaccionesMackup);

  return (
    <View style={styles.container}>
      <View style={styles.gastosIngresosContainer}>
        <View style={styles.gastosContainer}>
          <ArrowCircleDown
            width={moderateScale(40)}
            height={moderateScale(40)}
            color="#FFFFFF"
          />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>{"Gastos"}</Text>
            <Text style={styles.secondText}>{`$${totalExpenses.toLocaleString()}`}</Text>
          </View>
        </View>
        <View style={styles.IngresosContainer}>
          <ArrowCircleUp
            width={moderateScale(40)}
            height={moderateScale(40)}
            color="#FFFFFF"
          />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>{"Ingresos"}</Text>
            <Text style={styles.secondText}>{`$${totalIncome.toLocaleString()}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: verticalScale(16),
    marginBottom: verticalScale(10),
  },
  gastosIngresosContainer: {
    flexDirection: "row",
    display: "flex",
    backgroundColor: "#3476F4",
    boxShadow: "0 0 0 inset, 4px 4px 0 0 #000",
    gap: scale(23),
    borderRadius: moderateScale(22),
    padding: moderateScale(16),
  },
  gastosContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  containerText: {
    marginRight: scale(3),
  },
  mainText: {
    color: "#FFFFFF",
    lineHeight: verticalScale(18),
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_500Medium",
    marginBottom: verticalScale(10),
  },
  secondText: {
    color: "#FFFFFF",
    fontSize: moderateScale(20),
    lineHeight: verticalScale(20),
    fontFamily: "Montserrat_600SemiBold",
  },
  IngresosContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
});

export default IncomeExpenses;
