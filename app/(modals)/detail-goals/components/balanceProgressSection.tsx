import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ProgressBar from "./progressBar";
import TotalMeta from "./totalSectionMeta";

interface BalanceProgressSectionProps {
  goal: {
    id: string;
    title: string;
    currentAmount: number;
    totalAmount: number;
    deadline: string;
    category: {
      name: string;
      icon: string;
    };
  };
}

const BalanceProgressSection = ({ goal }: BalanceProgressSectionProps) => {
  const remainingAmount = goal.totalAmount - goal.currentAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="flag" size={moderateScale(24)} color="#3476F4" />
        <Text style={styles.goalTitle}>{goal.title}</Text>
      </View>

      <TotalMeta savingAll={goal.currentAmount} allGoal={goal.totalAmount} />

      <View style={styles.progressContainer}>
        <View style={styles.progressBarWrapper}>
          <ProgressBar savingAll={goal.currentAmount} allGoal={goal.totalAmount} />
          <Text style={styles.progressMessage}>
            ¡Faltan ${remainingAmount.toLocaleString()} para alcanzar tu meta!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(18),
    gap: verticalScale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  goalTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(18),
    color: "#181a2a",
    lineHeight: verticalScale(27),
    flex: 1,
  },
  progressContainer: {
    gap: verticalScale(10),
  },
  progressBarWrapper: {
    backgroundColor: "#3476f4",
    borderColor: "#5e92f7",
    borderWidth: 1,
    borderRadius: moderateScale(18),
    padding: scale(16),
    gap: verticalScale(10),
    boxShadow: "0 0 0 0px #000 inset, 4px 4px 0 0 #000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  progressMessage: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(12),
    color: "#ffffff",
    textAlign: "center",
    lineHeight: verticalScale(18),
  },
});

export default BalanceProgressSection;