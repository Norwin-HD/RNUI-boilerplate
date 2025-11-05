import FinancialSummary from "./dashboard/FinancialSummary";
import Goals from "./dashboard/Goals";
import Header from "./dashboard/Header";
import IncomeExpenses from "./dashboard/IncomeExpenses";
import Insights from "./dashboard/Insights";
import RecentTransactions from "./dashboard/RecentTransactions";
import Tabs from "./dashboard/Tabs";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Todas");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <View style={styles.column3}>
          <FinancialSummary />
          <IncomeExpenses income={110.17} expenses={110.17} />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "Todas" && (
            <>
              <Goals />
              <RecentTransactions />
            </>
          )}
          {activeTab === "Transacciones" && <RecentTransactions />}
          {activeTab === "Metas" && <Goals />}
          <Insights />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(40),
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  column3: {
    marginBottom: verticalScale(29),
    marginHorizontal: moderateScale(20),
  },
});
