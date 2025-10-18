import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const MetasScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column3}>
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
});