import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useCategoryContext } from "../../contexts/contexts-category/dataContext";
import categories from "../../mackups/categories-filter";


interface CategoriaCardProps {
  title: string;
  transactions: string;
  active?: boolean;
}

function handlePress() {
  router.push("/(tabs)/transacciones/screens/categorieFilterScreen");
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({
  title,
  transactions,
  active = false,
}) => {
  return (
    <View style={[styles.card, !active && styles.inactiveCard]}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>{/* Icono eliminado */}</View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.transactions}>{transactions}</Text>
        </View>
      </View>
    </View>
  );
};

function CategoriesHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{"Categorías"}</Text>
      <View style={styles.arrowContainer}>
        <Text style={styles.headerAction}>{"Ver todo"}</Text>
        <TouchableOpacity onPress={() => handlePress()}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/bfp1jzo4_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.iconArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TarjetasDeCategoria() {
  const { selectedCategories } = useCategoryContext();

  //Configuracion para que solamente se muestren las categorias seleccionadas o las dos primeras por defecto
  // y no sobrecargar la pantalla principal con muchas tarjetas
  const preview =
    selectedCategories.length > 0
      ? categories.filter((c) => selectedCategories.includes(c.title))
      : categories.slice(0, 2);
  return (
    <View>
      <CategoriesHeader />
      <View style={styles.container}>
        {preview.map((c, idx) => (
          <CategoriaCard
            key={c.title + idx}
            title={c.title}
            transactions={c.transactions}
            active={c.active}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(16),
    color: "#0b1b2b",
  },
  headerAction: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(25),
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(8),
  },
  iconArrow: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  card: {
    backgroundColor: "#E1EBFD",
    height: scale(170),
    borderRadius: moderateScale(18),
    width: scale(200),
    boxShadow: "0 2px 5px 1px rgba(0, 0, 0, 0.25)",
  },
  inactiveCard: {
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(20),
  },
  iconContainer: {
    backgroundColor: "#c2caf2",
    borderWidth: 1,
    borderColor: "#8590c8",
    borderRadius: 999,
    width: scale(50),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: scale(35),
    height: scale(35),
  },
  textContainer: {
    gap: moderateScale(8),
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(40),
    color: "black",
  },
  transactions: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    color: "black",
  },
});
