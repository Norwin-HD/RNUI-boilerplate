import { useTransactionDetail } from "@/src/shared/TransactionDetailContext";
import React from "react";
import { Controller } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CategoriaCardList from "./Categories";
import InputCalendar from "./inputCalendary";
import VaucherComponent from "./vaucherComponent";

interface FieldComponentProps {
  isEditable?: boolean;
  control?: any;
}

const FieldComponent: React.FC<FieldComponentProps> = ({ isEditable = false, control }) => {
  const transaction = useTransactionDetail();

  if (!transaction) return null;

  if (isEditable) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.mainTitle}>{transaction.type === "income" ? "Editar Ingreso" : "Editar Gasto"}</Text>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Monto</Text>
          <View style={styles.inputRowTall}>
            <Text style={styles.currency}>$</Text>
            <Controller
              control={control}
              name="monto"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.amountInput}
                  value={value.toString()}
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  keyboardType="numeric"
                  placeholder="0.00"
                />
              )}
            />
          </View>
        </View>

        <View style={styles.fieldBlock}>
          <Controller
            control={control}
            name="fecha"
            render={({ field: { onChange, value } }) => (
              <InputCalendar date={value} setDate={onChange} />
            )}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Descripción</Text>
          <Controller
            control={control}
            name="descripcion"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.descriptionInput}
                value={value}
                onChangeText={onChange}
                placeholder="Descripción"
                multiline
                numberOfLines={4}
              />
            )}
          />
        </View>
        <CategoriaCardList />
        <VaucherComponent control={control} />

      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle}>{transaction.type === "income" ? "Detalle Ingreso" : "Detalle Gasto"}</Text>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Monto</Text>
        <View style={styles.inputRowTall}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amountInput}>{transaction.monto.toString()}</Text>
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.inputValue}>{transaction.fecha ? new Date(transaction.fecha).toISOString().split('T')[0] : ""}</Text>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.descriptionText}>{transaction.descripcion || "Sin descripción"}</Text>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.descriptionText}>{transaction.categoria || "Sin categoría"}</Text>
      </View>

      {transaction.imagen || transaction.imageUri ? (
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Recibo o vaucher</Text>
          <View style={styles.receiptBox}>
            <Image source={{ uri: transaction.imagen || transaction.imageUri }} style={styles.receiptImage} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  mainTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    color: "#181A2A",
    marginBottom: verticalScale(24),
  },
  fieldBlock: {
    marginBottom: verticalScale(24),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    marginBottom: verticalScale(8),
  },
  inputRowTall: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: scale(8),
    height: verticalScale(48),
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
  },
  inputRowTallBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: verticalScale(48),
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
  },
  currency: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    color: "#3476F4",
  },
  amountInput: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    color: "#181A2A",
    flex: 1,
  },
  descriptionInput: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(12),
  },
  inputValue: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    color: "#181A2A",
  },
  calendarIcon: {
    width: scale(16),
    height: scale(16),
    borderRadius: 3,
    backgroundColor: "#3476F4",
    opacity: 0.9,
  },
  descriptionRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(12),
  },
  descriptionText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
  },
  receiptBox: {
    height: verticalScale(188),
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6C75AD",
    borderRadius: moderateScale(12),
    overflow: "hidden",
    position: "relative",
  },
  receiptImage: {
    width: "100%",
    height: "100%",
  },
  receiptPlaceholder: {
    flex: 1,
    backgroundColor: "#E1EBFD",
  },
  expandIcon: {
    position: "absolute",
    right: scale(8),
    bottom: scale(8),
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    backgroundColor: "#3476F4",
    opacity: 0.9,
  },
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    marginTop: verticalScale(20),
    backgroundColor: "#3476F4",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
  },
  closeText: {
    color: "#ffffff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(14),
  },
});

export default FieldComponent;
