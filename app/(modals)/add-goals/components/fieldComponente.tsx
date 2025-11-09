import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

interface FieldComponentProps {
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: () => void;
  onChangeText: (text: string) => void;
  value: string;
  error?: string;
}

const FieldComponent = ({
  label,
  placeholder,
  keyboardType,
  onBlur,
  onChangeText,
  value,
  error,
}: FieldComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={"#B3B3B3"}
          style={styles.input}
          cursorColor="#181A2A"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(8),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(15),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    marginBottom: verticalScale(8),
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
    paddingVertical: moderateScale(12),
    color: "#181A2A",
  },
  errorText: {
    color: "red",
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },
});

export default FieldComponent;
