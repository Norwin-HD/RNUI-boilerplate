import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type InputSearchProps = {
  value?: string;
  onChangeText?: (text: string) => void;
};

const InputSearch = ({ value, onChangeText }: InputSearchProps) => {

  return (
    <View style={styles.containerInput}>
      <TextInput
        placeholder="Buscar categorías"
        placeholderTextColor={"#B3B3B3"}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <EvilIcons name="search" size={24} color="#000000" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderColor: "#C0C3DC",
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(8),
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(11),
    paddingHorizontal: moderateScale(15),
    fontSize: scale(14),
    fontFamily: "Montserrat_400Regular",
  },
  icon: {
    position: "absolute",
    right: moderateScale(10),
  },
});

export default InputSearch;
