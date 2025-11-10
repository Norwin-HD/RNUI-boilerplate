import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Categories from "./Categories";
import InputCalendar from "./inputCalendary";
import VaucherComponent from "./vaucherComponent";

const inputStyle = {
  backgroundColor: "#fff",
  color: "#181A2A",
  borderRadius: 8,
  padding: 10,
  marginTop: 4,
  fontSize: 16,
};

export default function DetailTransactionsContainer({ control, setValue, watch }: any) {
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Editar transacción</Text>

        {/* Categoría editable */}
        <Categories selected={watch("categoria")} onSelect={(val) => setValue("categoria", val)} />

        {/* Monto editable */}
        <View style={{ marginVertical: verticalScale(8) }}>
          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={inputStyle}
            value={watch("monto")?.toString()}
            onChangeText={(val) => setValue("monto", Number(val))}
            keyboardType="numeric"
            placeholder="Monto"
            placeholderTextColor="#B3B3B3"
          />
        </View>

        {/* Fecha editable */}
        <InputCalendar
          date={watch("fecha")}
          setDate={(val) => setValue("fecha", val ?? new Date())}
        />

        {/* Descripción editable */}
        <View style={{ marginVertical: verticalScale(8) }}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={inputStyle}
            value={watch("descripcion")}
            onChangeText={(val) => setValue("descripcion", val)}
            placeholder="Descripción"
            placeholderTextColor="#B3B3B3"
          />
        </View>

        {/* Imagen editable */}
        <VaucherComponent control={control} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    backgroundColor: "#ffffff",
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    gap: verticalScale(8),
  },
  mainTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    color: "#181A2A",
    marginBottom: verticalScale(24),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    marginBottom: verticalScale(8),
  },
});
