import { ExpenseSchema } from "@/src/schema/expenseSchema";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { z } from "zod";
import CategoriaCard from "./Categories";
import InputCalendar from "./inputCalendary";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

interface FieldComponentProps {
  control: Control<ExpenseFormData>;
  errors: FieldErrors<ExpenseFormData>;
}

const FieldComponent = ({ control, errors }: FieldComponentProps) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Monto</Text>
        <Controller
          control={control}
          name="monto"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputRow}>
              <TextInput
                onBlur={onBlur}
                onChangeText={(text) => {
                  const num = parseFloat(text);
                  onChange(isNaN(num) ? undefined : num);
                }}
                value={value ? value.toString() : ""}
                placeholder={"0.00"}
                keyboardType="numeric"
                placeholderTextColor={"#B3B3B3"}
                style={styles.input}
                cursorColor="#181A2A"
              />
            </View>
          )}
        />
        {errors.monto && (
          <Text style={styles.errorText}>{errors.monto.message as string}</Text>
        )}

        <Controller
          control={control}
          name="fecha"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              date={value || null}
              setDate={(date) => onChange(date)}
              error={errors.fecha?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="categoria"
          render={({ field: { onChange } }) => (
            <CategoriaCard />
          )}
        />
        {errors.categoria && (
          <Text style={styles.errorText}>
            {errors.categoria.message as string}
          </Text>
        )}

        <Text style={styles.label}>Descripción (opcional)</Text>
        <Controller
          control={control}
          name="descripcion"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputRow}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={"Agrega una nota opcional"}
                keyboardType="default"
                placeholderTextColor={"#B3B3B3"}
                style={styles.input}
                cursorColor="#181A2A"
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: verticalScale(16),
  },
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
  errorText: {
    color: "red",
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
  },
});

export default FieldComponent;
