import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Header from "../components/header";
import SelectionCard from "../components/selectionCard";
import TotalAhorradoYMetalTotal from "../components/totalSection";
import ProgressBar from "../components/progressBar";
import Goals from "../components/goals";

const MetasScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.column3}>
          <SelectionCard />
          <TotalAhorradoYMetalTotal savingAll={5050.17} allGoal={8000.17} />
          <ProgressBar savingAll={5050.17} allGoal={8000.17} />
          <Goals />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MetasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(45),
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  column3: {
    marginBottom: verticalScale(29),
    marginHorizontal: moderateScale(14),
  },
});
