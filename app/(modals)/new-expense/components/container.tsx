import { ExpenseSchema } from "@/src/features/transacciones/schemas";
import React from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { z } from "zod";
import { useCategoryContext } from "../../../../src/features/transacciones/contexts/contexts-category/CategoryContext";
import FieldComponent from "./fieldComponente";
import VaucherComponent from "./vaucherComponent";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

interface AddExpenseContainerProps {
  control: Control<ExpenseFormData>;
  errors: FieldErrors<ExpenseFormData>;
  setValue: UseFormSetValue<ExpenseFormData>;
}

export default function AddExpenseContainer({
  control,
  errors,
  setValue,
}: AddExpenseContainerProps) {
  const { selectedCategories } = useCategoryContext();

  React.useEffect(() => {
    if (selectedCategories.length > 0) {
      setValue("categoria", selectedCategories[0]);
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
        <FieldComponent control={control} errors={errors} />

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
});
