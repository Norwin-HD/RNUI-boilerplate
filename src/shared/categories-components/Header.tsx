import ArrowSmallLeft from "@/app/(tabs)/transacciones/svg/arrow-small-left";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import AddCategoryModal from "../categories-components/AddCategory";

const Header = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const handleAddCategory = (name: string) => {
    setCategories([...categories, name]);
    console.log("Categorías actualizadas:", [...categories, name]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <ArrowSmallLeft width={24} height={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Categorías</Text>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.modalButtonText}>Agregar</Text>
      </TouchableOpacity>

      <AddCategoryModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onAddCategory={handleAddCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(20),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(8),
  },
  button: {
    padding: scale(2),
  },
  title: {
    color: "#454A53",
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_700Bold",
    paddingRight: scale(24),
  },
  modalButton: {
    backgroundColor: "#3476F4",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_500Medium",
  },
});

export default Header;
