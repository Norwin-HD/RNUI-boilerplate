import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

// savingAll: Total ahorrado en la meta
// allGoal: Tu meta total

interface ProgressBarProps {
  savingAll: number;
  allGoal: number;
}

const ProgressBar = ({ savingAll, allGoal }: ProgressBarProps) => {
  const percentage = allGoal > 0 ? Math.min(Math.round((savingAll / allGoal) * 100), 100) : 0;

  const { width } = Dimensions.get('window');
  const scaleFactor = Math.min(Math.max(width / 375, 0.8), 1.4); 
  const percentageFont = moderateScale(12 * scaleFactor);

  return (
    <View style={styles.secondContainer}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]}></View>
      </View>
      <Text style={[styles.percentageText, { fontSize: percentageFont }]}>{`${percentage}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  progressBarContainer: {
    flex: 1,
    height: verticalScale(8),
    backgroundColor: "#C2CAF2",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#5e92f7",
    overflow: 'hidden',
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#32DE83",
    borderRadius: 9999,
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default ProgressBar;
