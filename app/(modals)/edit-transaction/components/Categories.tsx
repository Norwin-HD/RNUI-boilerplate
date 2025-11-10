import { categories } from "@/app/mockups/categories-filter";
import { useCategoryContext } from "@/src/features/add-goals/contexts/CategoryContext";
import DynamicImage from "@/types/components/dynamicImage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
type Categoria = {
  title: string;
  transactions: string;
  imageUri?: string;
  active?: boolean;
};

const CategoriaCard = ({ title, transactions, imageUri, active }: Categoria) => (
  <View style={[styles.card, !active && styles.inactive]}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <DynamicImage
          path={`${imageUri}.webp` || "https://ik.imagekit.io/ffbwrejsa/Kovara/package.webp?updatedAt=1762713644321"}
          width={moderateScale(32)}
          height={moderateScale(32)}
          borderRadius={moderateScale(16)}
        />
      </View>
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
      onPress={() => router.push("/(modals)/edit-transaction/categorie-filter")}
    >
      <Text style={styles.headerText}>Ver todo</Text>
      <Ionicons name="chevron-forward" size={moderateScale(16)} color="#3476F4" />
    </TouchableOpacity>
  </View>
);

export default function CategoriaCardList() {
  const { selectedCategories } = useCategoryContext();

  // Muestra categorías seleccionadas, o las dos primeras por defecto
  const preview =
    selectedCategories.length > 0
      ? categories.filter((c) => selectedCategories.includes(c.title))
      : categories.slice(0, 2);

  return (
    <View style={styles.container}>
      <CategoriesHeader />

      <FlatList
        data={preview}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.title}
        scrollEnabled={false} // evita conflicto con el scroll principal
        renderItem={({ item }) => <CategoriaCard {...item} />}
        contentContainerStyle={{ gap: moderateScale(12) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(16),
    marginBottom: moderateScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(16),
    paddingHorizontal: moderateScale(4),
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
    color: "#3476F4",
  },
  card: {
    backgroundColor: "#E1EBFD",
    borderRadius: moderateScale(16),
    width: "60%",
    marginRight: moderateScale(20),
    height: scale(130),
    borderWidth: 1,
    boxShadow: "0 2px 5px 1px rgba(0, 0, 0, 0.25)",
    borderColor: "#D4E2FC",
  },
  inactive: {
    opacity: 0.6,
    backgroundColor: "#F5F7FA",
    borderColor: "#E1E5E9",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: moderateScale(14),
  },
  iconContainer: {
    marginBottom: moderateScale(8),
    backgroundColor: "#C2CAF2",
    borderWidth: 2,
    borderColor: "#8590C8",
    borderRadius: moderateScale(20),
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(14),
    color: "#0B1B2B",
    marginBottom: moderateScale(4),
  },
  transactions: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(11),
    color: "#6B7280",
  },
});
