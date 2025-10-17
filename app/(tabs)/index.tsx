import FinancialSummary from "@/components/dashboard/FinancialSummary";
import Goals from "@/components/dashboard/Goals";
import Header from "@/components/dashboard/Header";
import IncomeExpenses from "@/components/dashboard/IncomeExpenses";
import Insights from "@/components/dashboard/Insights";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import Tabs from "@/components/dashboard/Tabs";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const IndexScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <View style={styles.column3}>
          <FinancialSummary />
          <IncomeExpenses />
          <Tabs />
          <Goals />
          <RecentTransactions />
          <Insights />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;

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
