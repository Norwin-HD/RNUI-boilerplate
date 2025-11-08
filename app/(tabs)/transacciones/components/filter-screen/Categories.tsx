import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import categories from "../../../../mackups/categories-filter";
import { useCategoryContext } from "../../contexts/contexts-category/dataContext";

type Categoria = {
  title: string;
  transactions: string;
  active?: boolean;
};

const CategoriaCard = ({ title, transactions, active }: Categoria) => (
  <View style={[styles.card, !active && styles.inactive]}>
    <View style={styles.cardContent}>
      <View style={styles.iconPlaceholder} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.transactions}>{transactions}</Text>
      </View>
    </View>
  </View>
);

const CategoriesHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Categorías</Text>
    <TouchableOpacity
      style={styles.headerAction}
      onPress={() =>
        router.push(
          "/(tabs)/transacciones/screens/filterScreen/categorieFilterScreen"
        )
      }
    >
      <Text style={styles.headerText}>Ver todo</Text>
      <Image
        source={{
          uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/bfp1jzo4_expires_30_days.png",
        }}
        resizeMode="stretch"
        style={styles.iconArrow}
      />
    </TouchableOpacity>
  </View>
);

export default function TarjetasDeCategoria() {
  const { selectedCategories } = useCategoryContext();

  const preview =
    selectedCategories.length > 0
      ? categories.filter((c) => selectedCategories.includes(c.title))
      : categories.slice(0, 2);

  return (
    <View>
      <CategoriesHeader />
      <View style={styles.list}>
        {preview.map((c, i) => (
          <CategoriaCard key={i} {...c} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: moderateScale(12),
  },
  headerTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(16),
    color: "#0b1b2b",
  },
  headerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
  },
  headerText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
  },
  iconArrow: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(20),
    paddingHorizontal: moderateScale(8),
  },
  card: {
    backgroundColor: "#E1EBFD",
    borderRadius: moderateScale(18),
    width: scale(200),
    height: scale(170),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inactive: {
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: moderateScale(16),
  },
  iconPlaceholder: {
    backgroundColor: "#c2caf2",
    borderWidth: 1,
    borderColor: "#8590c8",
    borderRadius: 999,
    width: scale(50),
    height: scale(50),
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    color: "#000",
  },
  transactions: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    color: "#000",
  },
});
