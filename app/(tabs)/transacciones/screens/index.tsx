import { useTransactions } from "@/app/(tabs)/transacciones/hooks/use-transactions";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Expenses from "../components/transactions/Expenses";
import Header from "../components/transactions/Header";
import Tabs from "../components/transactions/Tabs";
import TransactionsCard from "../components/transactions/TrasaccionsCard";
import { useFilter } from "../contexts/context-filter-transaction/FilterContext";

const TransaccionesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("Todas");
  const { appliedFilters } = useFilter();
  const { filteredTransactions: allFilteredTransactions } =
    useTransactions(activeTab as Parameters<typeof useTransactions>[0]);

  const filteredTransactions = useMemo(() => {
    if (appliedFilters.type === "all" && !appliedFilters.dates) {
      return allFilteredTransactions;
    }

    return allFilteredTransactions.filter((transaction) => {
      // Filter by type
      if (appliedFilters.type === "income" && transaction.type !== "income") {
        return false;
      }
      if (appliedFilters.type === "expense" && transaction.type !== "expense") {
        return false;
      }

      // Filter by date
      if (appliedFilters.dates) {
        const [startDate, endDate] = appliedFilters.dates;
        const transactionDate = new Date(transaction.fecha);

        const filterStartDate = new Date(startDate);
        filterStartDate.setHours(0, 0, 0, 0);

        const filterEndDate = new Date(endDate);
        filterEndDate.setHours(23, 59, 59, 999);

        if (
          transactionDate < filterStartDate ||
          transactionDate > filterEndDate
        ) {
          return false;
        }
      }

      return true;
    });
  }, [appliedFilters, allFilteredTransactions]);

  const router = useRouter();

  const handleFilterPress = () => {
    router.push("/(tabs)/transacciones/screens/filterScreen/filterScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.column3}>
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onFilterPress={handleFilterPress}
            />
            <Expenses />
            <TransactionsCard transactions={filteredTransactions} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TransaccionesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(45),
    backgroundColor: "#FFFFFF",
    marginBottom: verticalScale(50),
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  column3: {
    paddingVertical: 0,
    paddingHorizontal: moderateScale(15),
  },
});
