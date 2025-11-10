import { useFilter } from "@/src/features/transacciones/contexts/context-filter-transaction/FilterContext";
import { useTransactions } from "@/src/features/transacciones/contexts/transactions-context";
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

const TransaccionesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("Todas");
  const { appliedFilters } = useFilter();
  const { transactions: allFilteredTransactions } =
    useTransactions();

  const filteredTransactions = useMemo(() => {
    let baseTransactions = allFilteredTransactions;

    if (activeTab === "Ingresos") {
      baseTransactions = baseTransactions.filter(transaction => transaction.type === "income");
    } else if (activeTab === "Gastos") {
      baseTransactions = baseTransactions.filter(transaction => transaction.type === "expense");
    }

    if (appliedFilters.type !== "all" || appliedFilters.dates) {
      return baseTransactions.filter((transaction) => {

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
    }

    return baseTransactions;
  }, [appliedFilters, allFilteredTransactions, activeTab]);

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
            <TransactionsCard
              transactions={filteredTransactions.map((transaction) => ({
                ...transaction,
                imageUri: transaction.imageUri || transaction.imagen || "",
              }))}
            />
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
