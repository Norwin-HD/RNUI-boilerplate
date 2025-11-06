import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import BudgetsList from "../components/budget";
import Goals from "../components/goals";
import Header from "../components/header";
import ProgressBar from "../components/progressBar";
import ProgressBarBudget from "../components/progressBarBudget";
import SelectionCard from "../components/selectionCard";
import TotalPresupuesto from "../components/totalSectionBudget";
import TotalMeta from "../components/totalSectionMeta";

import { useBudgetCalculations } from "../hooks/use-budget-calcutation";
import { useGoalsCalculations } from "../hooks/use-goals-calcutations";

const MetasScreen = () => {
  const [selectedComponent, setSelectedComponent] = useState<
    "metas" | "presupuestos"
  >("metas");

  const { totalBudget, totalExpenses } = useBudgetCalculations();
  const { totalProgress, totalGoals } = useGoalsCalculations();

  const renderComponent = () => {
    if (selectedComponent === "metas") {
      return (
        <View>
          <TotalMeta savingAll={totalProgress} allGoal={totalGoals} />
          <ProgressBar savingAll={totalProgress} allGoal={totalGoals} />
          <Goals />
        </View>
      );
    } else {
      return (
        <View>
          <TotalPresupuesto BudgetAll={totalBudget} ExpensesGoal={totalExpenses} />
          <ProgressBarBudget
            BudgetAll={totalBudget}
            ExpensesGoal={totalExpenses}
          />
          <BudgetsList />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.column3}>
          <SelectionCard onSelectionChange={setSelectedComponent} />
          {renderComponent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MetasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(45),
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  column3: {
    marginBottom: verticalScale(29),
    marginHorizontal: moderateScale(15),
  },
});
