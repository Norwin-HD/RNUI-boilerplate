import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

//Components
import Categories from "../../components/filter-screen/Categories";
import Footer from "../../components/filter-screen/footer";
import Header from "../../components/filter-screen/Header";
import InputCalendar from "../../components/filter-screen/inputCalendary";
import RangePrice from "../../components/filter-screen/selectRangeMoney";
import TabRangeTime from "../../components/filter-screen/TabRangeTime";
import Tabs from "../../components/filter-screen/Tabs";

//Context
import { FilterType } from "../../contexts/context-filter-transaction/FilterContext";

//Hooks
import { useFilterScreen } from "../../hooks/hooks-filter/use-filter-screen";

type TabType = "Todas" | "Ingresos" | "Gastos";


// Refleja el tipo de transaccion
const typeMap: Record<TabType, FilterType> = {
  Todas: "all",
  Ingresos: "income",
  Gastos: "expense",
};

// Refleja el tipo de transaccion
const reverseTypeMap: Record<FilterType, TabType> = {
  all: "Todas",
  income: "Ingresos",
  expense: "Gastos",
};

const FilterScreen = () => {
  const {
    activeTypeTab,
    setActiveTypeTab,
    activeRangeTimeTab,
    setActiveRangeTimeTab,
    rangeDate,
    setRangeDate,
    handleApplyFilters,
    handleClearFilters,
  } = useFilterScreen();

  const handleSetActiveTypeTab = (tab: TabType) => {
    setActiveTypeTab(typeMap[tab]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Pantalla de filtros para transacciones"
        >
          <View style={styles.column3}>
            <Header />
            <Tabs
              activeTab={reverseTypeMap[activeTypeTab]}
              setActiveTab={handleSetActiveTypeTab}
            />
            <Categories />
            <TabRangeTime
              activeTab={activeRangeTimeTab}
              setActiveTab={setActiveRangeTimeTab}
            />
            <InputCalendar dates={rangeDate} setDates={setRangeDate} />
            <RangePrice />
            <Footer onApply={handleApplyFilters} onClear={handleClearFilters} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FilterScreen;

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
    marginHorizontal: moderateScale(12),
  },
});
