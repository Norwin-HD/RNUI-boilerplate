import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CategoriaCard from "./Categories";
import InputCalendar from "./inputCalendary";

const FieldComponent = () => {
  const [dates, setDates] = useState<[Date, Date] | null>(null);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>Monto</Text>
        <View style={styles.inputRow}>
          <TextInput
            onChangeText={() => {}}
            placeholder={"0.00"}
            keyboardType="numeric"
            placeholderTextColor={"#B3B3B3"}
            style={styles.input}
            cursorColor="#181A2A"
          />
        </View>
        <InputCalendar dates={dates} setDates={setDates} />
        <CategoriaCard />
        <Text style={styles.label}>Descripción (opcional)</Text>
        <View style={styles.inputRow}>
          <TextInput
            onChangeText={() => {}}
            placeholder={"Agrega una nota opcional"}
            keyboardType="default"
            placeholderTextColor={"#B3B3B3"}
            style={styles.input}
            cursorColor="#181A2A"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(2),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(15),
    lineHeight: moderateScale(16),
    color: "#181A2A",
  },
  inputRow: {
    height: verticalScale(40),
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    minWidth: moderateScale(240),
  },
  input: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(15),
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(14),
    color: "#181A2A",
  },
});

export default FieldComponent;
