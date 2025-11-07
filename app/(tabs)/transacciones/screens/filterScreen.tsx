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
import Categories from "../components/filter-screen/Categories";
import Footer from "../components/filter-screen/footer";
import Header from "../components/filter-screen/Header";
import InputCalendar from "../components/filter-screen/inputCalendary";
import RangePrice from "../components/filter-screen/selectRangeMoney";
import TabRangeTime from "../components/filter-screen/TabRangeTime";
import Tabs from "../components/filter-screen/Tabs";
import { FilterType } from "../contexts/context-filter-transaction/FilterContext";
import { useFilterScreen } from "../hooks/hooks-filter/use-filter-screen";

type TabType = "Todas" | "Ingresos" | "Gastos";

const typeMap: Record<TabType, FilterType> = {
  Todas: "all",
  Ingresos: "income",
  Gastos: "expense",
};

const reverseTypeMap: Record<FilterType, TabType> = {
  all: "Todas",
  income: "Ingresos",
  expense: "Gastos",
};

const FilterScreen: React.FC = () => {
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

  // Agregar estado para rangos de precio (min/max) para hacer RangePrice controlado
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");

 //Función para validar y actualizar min/max (e.g., asegurar min < max)
  // const handleMinChange = (value: string) => {
  //   const numValue = parseFloat(value) || 0;
  //   if (numValue >= 0 && numValue <= parseFloat(maxPrice)) {
  //     setMinPrice(value);
  //   }
  // };

  // const handleMaxChange = (value: string) => {
  //   const numValue = parseFloat(value) || 0;
  //   if (numValue >= parseFloat(minPrice)) {
  //     setMaxPrice(value);
  //   }
  // };

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
            {/* CAMBIO: RangePrice ahora usa contexto */}
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