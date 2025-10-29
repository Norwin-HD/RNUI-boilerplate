import { useState } from "react";
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

//HOOKS
import useRangeTime from "../hooks/hooks-filter/use-range-time";
import { useTransactions } from "../hooks/use-transactions";

const FilterScreen: React.FC = () => {
  const [activeRangeTimeTab, setActiveRangeTimeTab] = useState("Hoy");
  const { FilteredRangeTime } = useRangeTime(activeRangeTimeTab);
  const { filteredTransactions } = useTransactions("Todas");
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
        >
          <View style={styles.column3}>
            <Header />
            <Tabs
              activeTab={"Todas"}
              setActiveTab={(tab: string) => {}}
              onFilterPress={() => {}}
            />
            <Categories />
            <TabRangeTime
              activeTab={FilteredRangeTime}
              setActiveTab={setActiveRangeTimeTab}
              onFilterPress={() => {}}
            />
            <InputCalendar />
            <RangePrice />
            <Footer />
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