import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const ExpensesCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Gastos vs. Presupuesto"}</Text>
      <View style={styles.secondContainer}>
        <View style={styles.porcentage}>
          <View style={styles.box}></View>
        </View>
        <Text style={styles.porcentageText}>{"40%"}</Text>
      </View>
      <Text style={styles.montoRestante}>{"$165 de $ 4,000"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3476F4",
    borderRadius: moderateScale(18),
    borderWidth: 0.1,
    boxShadow: "0 0 0 2px #000 inset, 4px 4px 0 0 #000",
    padding: moderateScale(16),
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
  porcentage: {
    flex: 1,
    backgroundColor: "#C2CAF2",
    borderRadius: 9999,
    marginRight: scale(8),
  },
  box: {
    width: scale(121),
    height: verticalScale(8),
    backgroundColor: "#32DE83",
    borderColor: "#1FC16B",
    borderRadius: 9999,
    borderWidth: 1,
  },
  porcentageText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_600SemiBold",
  },
  montoRestante: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default ExpensesCard;
