import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import TransactionsCard from "./components/TrasaccionsCard";
import Expenses from "./components/Expenses";

const TransaccionesScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column3}>
          <View style={styles.header}>
          </View>
          <Expenses />
          <TransactionsCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransaccionesScreen;

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
    marginHorizontal: moderateScale(20),
  },

  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(20),
  },
});