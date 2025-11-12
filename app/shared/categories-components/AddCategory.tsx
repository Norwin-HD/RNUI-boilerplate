import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import DynamicImage from "@/src/utils/dynamicImage";

interface IconOption {
  id: string;
  imageUri: string;
}

interface AddCategoryBottomSheetProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
  onAddCategory: (name: string, icon: string) => void;
}

const iconOptions: IconOption[] = [
  { id: "1", imageUri: "food" },
  { id: "2", imageUri: "car" },
  { id: "3", imageUri: "coffe" },
  { id: "4", imageUri: "briefcase" },
  { id: "5", imageUri: "cart-shopping" },
  { id: "6", imageUri: "party" },
  { id: "7", imageUri: "pills" },
  { id: "8", imageUri: "house" },
  { id: "9", imageUri: "plane" },
  { id: "10", imageUri: "giftbox" },
  { id: "11", imageUri: "mobile-app" },
  { id: "12", imageUri: "tortoiseshell" },
  { id: "13", imageUri: "mortarboard" },
  { id: "14", imageUri: "package" },
];

const AddCategoryBottomSheet = ({
  visible,
  setVisible,
  onAddCategory,
}: AddCategoryBottomSheetProps) => {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleAdd = () => {
    if (name.trim() && selectedIcon) {
      onAddCategory(name.trim(), selectedIcon);
      setName("");
      setSelectedIcon(null);
      setVisible(false);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.4}
      avoidKeyboard={false}
      useNativeDriver={false}
    >
      <View style={styles.sheet}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Nueva Categoría</Text>
          <Pressable onPress={handleAdd}>
            <Text style={styles.saveText}>Guardar</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          placeholder="Ingresa un nombre para la categoría"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Selecciona un icono</Text>

        <FlatList
          data={iconOptions}
          numColumns={4}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: verticalScale(10) }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedIcon(item.imageUri)}
              style={[
                styles.iconWrapper,
                selectedIcon === item.imageUri && styles.iconSelected,
              ]}
            >
              <DynamicImage
                path={`${item.imageUri}.webp`}
                width={moderateScale(38)}
                height={moderateScale(38)}
              />
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(24),
    maxHeight: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#111827",
    fontFamily: "Montserrat_600SemiBold",
  },
  saveText: {
    fontSize: moderateScale(14),
    color: "#3476F4",
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",},
  label: {
    fontSize: moderateScale(13),
    fontWeight: "500",
    color: "#374151",
    marginBottom: verticalScale(4),
    marginTop: verticalScale(10),
    fontFamily: "Montserrat_500Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: scale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(11),
    color: "#111827",
    fontFamily: "Montserrat_400Regular",
  },
  iconWrapper: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    margin: scale(8),
  },
  iconSelected: {
    backgroundColor: "#E0ECFF",
    borderWidth: 2,
    borderColor: "#3476F4",
  },
});

export default AddCategoryBottomSheet;
