import { BudgetValidationSchema } from "@/src/schema/budgetSchema";
import { useCategoryContext } from "@/src/stores/categories/CategoryContext";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { z } from "zod";
import CategoriaCard from "./Categories";
import FieldComponent from "./fieldComponente";
import InputCalendar from "./inputCalendary";

type BudgetFormData = z.infer<typeof BudgetValidationSchema>;

interface AddBudgetContainerProps {
  control: Control<BudgetFormData>;
  errors: FieldErrors<BudgetFormData>;
  setValue: UseFormSetValue<BudgetFormData>;
}

export default function AddBudgetContainer({
  control,
  errors,
  setValue,
}: AddBudgetContainerProps) {
  const { selectedCategories } = useCategoryContext();

  React.useEffect(() => {
    if (selectedCategories.length > 0) {
      setValue("category", {
        name: selectedCategories[0],
        icon: selectedCategories[0].toLowerCase(),
      });
    }
  }, [selectedCategories, setValue]);

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
        <CategoriaCard />
        <Controller
          control={control}
          name="currentAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldComponent
              label="Monto Presupuestado"
              placeholder="0.00"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              value={value?.toString() ?? ""}
              error={errors.currentAmount?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="period"
          render={({ field: { onChange, value } }) => {
            const dateRange = value && typeof value === 'object' && 'start' in value ? value : { start: null, end: null };
            return (
              <InputCalendar
                date={dateRange}
                setDate={(range) => onChange(range)}
                error={errors.period?.message}
              />
            );
          }}
        />
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
});
