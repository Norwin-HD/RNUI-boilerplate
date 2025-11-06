import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import UsdCircleIcon from "../../svg/usd-cirlcle";

interface SelectRangeMoneyProps {
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const SelectRangeMoney = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: SelectRangeMoneyProps) => {
  const [minPrice, setMinPrice] = useState(minValue);
  const [maxPrice, setMaxPrice] = useState(maxValue);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{"Rango de montos"}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <UsdCircleIcon color="black" height={16} width={16} />
          <TextInput
            placeholder="Mínimo"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={(value) => {
              setMinPrice(value);
              onMinChange(value);
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <UsdCircleIcon color="black" height={16} width={16} />
          <TextInput
            placeholder="Máximo"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={(value) => {
              setMaxPrice(value);
              onMaxChange(value);
            }}
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    gap: verticalScale(12),
  },
  textHeader: {
    color: "#454A53",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_500Medium",
  },
  inputContainer: {
    flexDirection: "row",
    gap: moderateScale(16),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderColor: "#C0C3DC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: scale(10),
  },
  icon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    height: verticalScale(36),
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_400Regular",
  },
});

export default SelectRangeMoney;
