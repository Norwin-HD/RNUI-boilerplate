import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useRangeContext } from "../../contexts/context-range/dataContext";
import UsdCircleIcon from "../../svg/usd-cirlcle";

const SelectRangeMoney = () => {
  const { minValue, maxValue, setMinValue, setMaxValue } = useRangeContext();

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
            value={minValue?.toString() || ""}
            onChangeText={(value) => {
              const num = value ? parseFloat(value) : null;
              setMinValue(num);
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
            value={maxValue?.toString() || ""}
            onChangeText={(value) => {
              const num = value ? parseFloat(value) : null;
              setMaxValue(num);
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
