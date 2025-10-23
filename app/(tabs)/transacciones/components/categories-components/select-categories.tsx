import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

type Category = {
  imageUri?: string;
  title: string;
  transactions: string;
  active?: boolean;
};

type Props = {
  categories: Category[];
};

const selectCategories: React.FC<Props> = ({ categories }) => {
  return (
    <View>
      <Text style={styles.textHeader}>Selecciona una categoría</Text>
      <View style={styles.list}>
        {categories.map((c, idx) => (
          <View key={c.title + idx} style={styles.item}>
            {!!c.imageUri && (
              <Image source={{ uri: c.imageUri }} style={styles.avatar} />
            )}
            <View style={styles.itemText}>
              <Text style={styles.itemTitle}>{c.title}</Text>
              <Text style={styles.itemSub}>{c.transactions}</Text>
            </View>
          </View>
        ))}
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
    paddingVertical: verticalScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(18),
    boxShadow: "0 2px 5px 1px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#E1EBFD",
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
  itemSub: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    color: "#555",
  },
});

export default selectCategories;
