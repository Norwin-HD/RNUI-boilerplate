import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useBudgetsContext } from "../../../../src/stores/budgets/index";
import { useGoalsContext } from "../../../../src/stores/goals/index";
import MainGoalCard from "./MainGoalCard";
import SecondaryGoalCard from "./SecondaryGoalCard";

const Goals = () => {
  const { goals } = useGoalsContext();
  const { budgets } = useBudgetsContext();

  // Usar la primera meta como meta principal y el primer presupuesto como meta secundaria
  const mainGoal = goals[0];
  const secondaryGoal = budgets[0];

  return (
    <View style={styles.goalsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{"Metas y presupuestos"}</Text>
        <TouchableOpacity onPress={() => {router.push("/(tabs)/metas/screen");}}>
          <Ionicons name="chevron-forward" size={moderateScale(24)} color="#000000" />
        </TouchableOpacity>
      </View>
      {mainGoal && (
        <MainGoalCard
          title={mainGoal.title}
          deadline={new Date(mainGoal.deadline)}
          currentAmount={mainGoal.currentAmount}
          totalAmount={mainGoal.totalAmount}
          onPress={() => {router.push("/(tabs)/metas/screen");}}
        />
      )}
      {secondaryGoal && (
        <SecondaryGoalCard
          title={secondaryGoal.category.name}
          currentAmount={secondaryGoal.currentAmount}
          totalAmount={secondaryGoal.currentAmount}
          iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/gk7orci1_expires_30_days.png"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  goalsContainer: {
    gap: verticalScale(3),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(22),
    marginHorizontal: scale(2),
  },
  headerTitle: {
    color: "#000000",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_500Medium",
  },
});

export default Goals;
