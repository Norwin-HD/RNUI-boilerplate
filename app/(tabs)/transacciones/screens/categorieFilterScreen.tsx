import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";


const categoriaFilterScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column3}>
            <Text>Contenido de categorías…</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default categoriaFilterScreen;

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