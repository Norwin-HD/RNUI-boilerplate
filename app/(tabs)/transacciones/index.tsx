import { useTransactions } from "@/app/(tabs)/transacciones/hooks/use-transactions";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Expenses from "./components/Expenses";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TransactionsCard from "./components/TrasaccionsCard";

const TransaccionesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("Todas");
  const { filteredTransactions } = useTransactions(activeTab);

  const handleFilterPress = () => {
    Alert.alert("Filter button pressed!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column3}>
          <Header />

          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onFilterPress={handleFilterPress}
          />
          <Expenses />
          <TransactionsCard transactions={filteredTransactions} />
        </View>
      </ScrollView>
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
