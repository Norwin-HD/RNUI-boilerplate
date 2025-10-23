import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Footer from "../components/categories-components/Footer";
import Header from "../components/categories-components/Header";
import InputSearch from "../components/categories-components/input-search";
import SelectCategories from "../components/categories-components/select-categories";
import { useCategories } from "../hooks/hooks-filter-category/use-search";


const CategoriaFilterScreen: React.FC = () => {
  const { filteredCategories, setQuery } = useCategories();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: verticalScale(90) }}
        >
          <View style={styles.column3}>
            <Header />
            <InputSearch onChangeText={setQuery} />
            <SelectCategories categories={filteredCategories} />
          </View>
        </ScrollView>

        <View style={styles.staticFooter}>
          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoriaFilterScreen;

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
  footerStyle: {
    display: "none", // This line is not needed anymore, as we are moving Footer outside
  },
  staticFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(12),
    paddingTop: verticalScale(8),
    backgroundColor: "#FFFFFF",
  },

  column3: {
    marginBottom: verticalScale(29),
    marginHorizontal: moderateScale(20),
  },
});