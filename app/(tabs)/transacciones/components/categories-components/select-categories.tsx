import { useCategoryContext } from "@/src/features/transacciones/contexts/contexts-category/CategoryContext";
import DynamicImage from "@/types/components/dynamicImage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CheckIcon from "../../svg/check-icon";

type Category = {
  imageUri?: string;
  title: string;
  transactions: string;
  active?: boolean;
};

type Props = {
  categories: Category[];
};

const SelectCategories = ({ categories }: Props) => {
  const { selectedCategories, toggleCategory } = useCategoryContext();

  return (
    <View>
      <Text style={styles.textHeader}>Selecciona una categoría</Text>
      <View style={styles.list}>
        {categories.map((c, idx) => {
          const isSelected = selectedCategories.includes(c.title);
          return (
            <TouchableOpacity
              key={c.title + idx}
              onPress={() => toggleCategory(c.title)}
            >
              <View style={[styles.item, isSelected && styles.itemSelected]}>
                {!!c.imageUri && (
                  <DynamicImage
                    path={`${c.imageUri}.webp`}
                    width={moderateScale(60)}
                    height={moderateScale(60)}
                    borderRadius={moderateScale(999)}
                  />
                )}
                <View style={styles.itemText}>
                  <Text
                    style={[
                      styles.itemTitle,
                      isSelected && styles.itemTitleSelected,
                    ]}
                  >
                    {c.title}
                  </Text>
                  <Text
                    style={[
                      styles.itemSub,
                      isSelected && styles.itemSubSelected,
                    ]}
                  >
                    {c.transactions}
                  </Text>
                </View>
                {isSelected && (
                  <View style={styles.checkIconContainer}>
                    <CheckIcon color="#608affff" size={30} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    marginTop: verticalScale(30),
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
    color: "#0b1b2b",
  },
  list: {
    marginTop: verticalScale(16),
    gap: verticalScale(15),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(12),
    paddingVertical: verticalScale(15),
    borderWidth: 1,
    borderRadius: moderateScale(18),
    backgroundColor: "#E1EBFD",
    paddingRight: moderateScale(15),
  },
  itemSelected: {
    boxShadow: "0 2px 5px 1px rgba(0, 0, 0, 0.25)",
  },
  avatar: {
    marginLeft: moderateScale(10),
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(999),
    borderWidth: 1,
    borderColor: "#8590C8",
    backgroundColor: "#C2CAF2",
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(15),
    color: "#0b1b2b",
  },
  itemTitleSelected: {},
  itemSub: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    color: "#555",
  },
  itemSubSelected: {},
  checkIconContainer: {
    marginRight: moderateScale(15),
  },
});

export default SelectCategories;
