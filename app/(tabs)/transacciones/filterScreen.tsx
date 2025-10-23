import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Categories from "./components/filterScreen/Categories";
import Header from "./components/filterScreen/Header";
import InputCalendar from "./components/filterScreen/inputCalendary";
import RangePrice from "./components/filterScreen/selectRangeMoney";
import TabRangeTime from "./components/filterScreen/TabRangeTime";
import Tabs from "./components/filterScreen/Tabs";
import Footer from "./components/filterScreen/footer";

const filterScreen: React.FC = () => {
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
              activeTab={"Hoy"}
              setActiveTab={(tab: string) => {}}
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

export default filterScreen;

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