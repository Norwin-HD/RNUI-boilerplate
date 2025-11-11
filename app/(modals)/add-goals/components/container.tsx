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
import CategoriaCard from "./Categories";
import FieldComponent from "./fieldComponente";
import InputCalendar from "./inputCalendary";

interface GoalFormData {
  title: string;
  totalAmount: number;
  currentAmount?: number;
  deadline: string;
  category: {
    name: string;
    icon: string;
  };
}

interface AddGoalContainerProps {
  control: Control<GoalFormData>;
  errors: FieldErrors<GoalFormData>;
  setValue: UseFormSetValue<GoalFormData>;
}

export default function AddGoalContainer({
  control,
  errors,
  setValue,
}: AddGoalContainerProps) {
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
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldComponent
              label="Nombre de la meta"
              placeholder="Ej. vacaciones Europa"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.title?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="totalAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldComponent
              label="Monto objetivo"
              placeholder="0.00"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              value={value?.toString()}
              error={errors.totalAmount?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="currentAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldComponent
              label="Monto Actual (opcional)"
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
          name="deadline"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              date={value && value !== "" ? new Date(value) : null}
              setDate={(date) => onChange(date ? date.toISOString() : "")}
              error={errors.deadline?.message}
            />
          )}
        />
        <CategoriaCard />
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
