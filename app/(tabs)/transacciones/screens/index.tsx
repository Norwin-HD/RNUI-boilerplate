import { useHasActiveFilters } from "@/src/hooks/category/use-has-active-filters";
import { useTransactions } from "@/src/stores/transactions/transactions-context";
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
  const hasActiveFilters = useHasActiveFilters();
  const [activeTab, setActiveTab] = React.useState("Todas");
  const { filteredTransactions: allContextFilteredTransactions } = useTransactions();

  // Cuando hay filtros activos, forzar el tab a "Todas"
  const effectiveActiveTab = hasActiveFilters ? "Todas" : activeTab;

  const filteredTransactions = useMemo(() => {
    if (effectiveActiveTab === "Ingresos") {
      return allContextFilteredTransactions.filter(transaction => transaction.type === "income");
    } else if (effectiveActiveTab === "Gastos") {
      return allContextFilteredTransactions.filter(transaction => transaction.type === "expense");
    }
    return allContextFilteredTransactions;
  }, [allContextFilteredTransactions, effectiveActiveTab]);

  const handleTabChange = (tab: string) => {
    // Solo permitir cambiar el tab si no hay filtros activos
    if (!hasActiveFilters) {
      setActiveTab(tab);
    }
  };

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
              activeTab={effectiveActiveTab}
              setActiveTab={handleTabChange}
              onFilterPress={handleFilterPress}
              isLocked={hasActiveFilters}
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
