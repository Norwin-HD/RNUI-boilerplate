import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface SelectionCardProps {
  onSelectionChange?: (selected: "metas" | "presupuestos") => void;
}

const SelectionCard = ({ onSelectionChange }: SelectionCardProps) => {
  const [selected, setSelected] = useState<"metas" | "presupuestos">(
    "metas"
  );

  const handlePress = (option: "metas" | "presupuestos") => {
    setSelected(option);
    onSelectionChange?.(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, selected === "metas" && styles.activeOption]}
        onPress={() => handlePress("metas")}
      >
        <Text style={[styles.text, selected === "metas" && styles.activeText]}>
          Metas de ahorro
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selected === "presupuestos" && styles.activeOption,
        ]}
        onPress={() => handlePress("presupuestos")}
      >
        <Text
          style={[
            styles.text,
            selected === "presupuestos" && styles.activeText,
          ]}
        >
          Presupuestos
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(8),
    borderRadius: scale(18),
    backgroundColor: "#e1ebfd",
    borderWidth: 0.5,
    borderColor: "#181a2a",
    width: "100%",
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(8),
    paddingVertical: scale(12),
    borderRadius: scale(12),
  },
  activeOption: {
    backgroundColor: "#3476f4",
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(15),
    fontWeight: "600",
    lineHeight: verticalScale(24),
    color: "#181a2a",
    textAlign: "center",
  },
  activeText: {
    color: "#ffffff",
  },
});

export default SelectionCard;
