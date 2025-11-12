import { useCategoryContext } from "@/src/stores/categories/CategoryContext";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "react-native-size-matters";

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
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // responsive values
  const isLarge = width >= 768;
  const contentPadding = isLarge ? moderateScale(32) : moderateScale(20);
  const maxContentWidth = isLarge ? 760 : undefined;

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
        contentContainerStyle={[
          styles.container,
          {
            flexGrow: 1,
            paddingBottom: verticalScale(20) + insets.bottom + moderateScale(100),
            paddingHorizontal: contentPadding,
            alignSelf: "center",
            width: "100%",
            maxWidth: maxContentWidth,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
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
