import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

// savingAll: Total ahorrado en la meta
// allGoal: Tu meta total

interface ProgressBarProps {
  savingAll: number;
  allGoal: number;
}

const ProgressBar = ({ savingAll, allGoal }: ProgressBarProps) => {
  // Calcula el porcentaje gastado (evita que pase del 100%)
  const percentage = allGoal > 0 ? Math.min(Math.round((savingAll / allGoal) * 100), 100) : 0;
  // Si el presupuesto es 0, muestra 0% para evitar errores

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.progressBarContainer}>
          {/* Muestra una barra verde que crece segun el porcentaje */}
          <View style={[styles.progressBar, { width: `${percentage}%` }]}></View>
        </View>
        <Text style={styles.percentageText}>{`${percentage}%`}</Text>
      </View>
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
    boxShadow: "0 0 0 0px #000 inset, 4px 4px 0 0 #000",
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
});

export default ProgressBar;
