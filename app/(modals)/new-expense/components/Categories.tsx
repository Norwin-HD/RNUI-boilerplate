import { categories } from "@/app/mockups/categories-filter";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useCategoryContext } from "../../../../src/features/transacciones/contexts/contexts-category/CategoryContext";

type Categoria = {
  title: string;
  transactions: string;
  active?: boolean;
  imageUri?: string;
};

const CategoriaCard = ({ title, transactions, active, imageUri }: Categoria) => (
  <View style={[styles.card, !active && styles.inactive]}>
    <View style={styles.cardContent}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.categoryIcon}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.transactions}>{transactions}</Text>
      </View>
    </View>
  </View>
);

const CategoriesHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Categorías (Opcional)</Text>
    <TouchableOpacity
      style={styles.headerAction}
      onPress={() => router.push("/(modals)/new-expense/categorie-filter")}
    >
      <Text style={styles.headerText}>Ver todo</Text>
      <Ionicons name="chevron-forward" size={moderateScale(20)} color="#0b1b2b" />
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
    <View style={styles.container}>
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
  container: {
    flex: 1,
    marginBottom: moderateScale(20),
  },
  header: {
    paddingVertical: moderateScale(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(30),
    marginBottom: moderateScale(4),
  },
  headerTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
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
  list: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(12),
  },
  card: {
    backgroundColor: "#E1EBFD",
    borderRadius: moderateScale(18),
    width: scale(180),
    height: scale(140),
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
    padding: moderateScale(12),
  },
  iconPlaceholder: {
    backgroundColor: "#c2caf2",
    borderWidth: 1,
    borderColor: "#8590c8",
    borderRadius: 999,
    width: scale(42),
    height: scale(42),
  },
  categoryIcon: {
    width: scale(42),
    height: scale(42),
    borderRadius: moderateScale(8),
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
