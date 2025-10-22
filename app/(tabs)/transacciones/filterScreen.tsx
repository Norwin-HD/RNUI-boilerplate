import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Header from "./components/filterScreen/Header";
import Tabs from "./components/filterScreen/Tabs";
import TabRangeTime from "./components/filterScreen/TabRangeTime";
import Categories from "./components/filterScreen/Categories";
import InputCalendar  from "./components/filterScreen/inputCalendary";

const filterScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        </View>
      </ScrollView>
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