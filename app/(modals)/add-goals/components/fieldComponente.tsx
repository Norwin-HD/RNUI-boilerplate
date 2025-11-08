import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const FieldComponent = ({}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre de la meta</Text>
        <View style={styles.inputRow}>
          <TextInput
            onChangeText={() => {}}
            placeholder={"Ej. vacaciones Europa"}
            placeholderTextColor={"#B3B3B3"}
            style={styles.input}
            cursorColor="#181A2A"
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Monto objetivo</Text>
        <View style={styles.inputRow}>
          
          <TextInput
            onChangeText={() => {}}
            
            placeholder={"0.00"}
            placeholderTextColor={"#B3B3B3"}
            style={styles.input}
            cursorColor="#181A2A"
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Monto Actual</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={""}
            onChangeText={() => {}}
            placeholder={"0.00"}
            placeholderTextColor={"#B3B3B3"}
            style={styles.input}
            cursorColor="#181A2A"
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Fecha limite</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={""}
            onChangeText={() => {}}
            placeholder={"Seleccionar una fecha"}
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
    marginBottom: verticalScale(16),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    marginBottom: verticalScale(8),
  },
  inputRow: {
    height: verticalScale(48),
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    minWidth: moderateScale(240),
  },
  input: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(12),
    color: "#181A2A",
  },
});

export default FieldComponent;
