import { BudgetValidationSchema } from "@/src/schema/budgetSchema";
import { useBudgetsContext } from "@/src/stores/budgets/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { z } from "zod";
import AddBudgetContainer from "./components/container";
import Footer from "./components/Footer";
import Header from "./components/Header";

type BudgetFormData = z.infer<typeof BudgetValidationSchema>;

export default function AddBudgetModal() {
  const router = useRouter();
  const { addBudget } = useBudgetsContext();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(BudgetValidationSchema),
    defaultValues: {
      currentAmount: 0,
      period: { start: null, end: null },
      category: {
        name: "Otros",
        icon: "package",
      },
    },
  });

  const onSubmit = (data: BudgetFormData) => {
    const newBudget = {
      ...data,
      id: Math.random().toString(),
      title: "New Budget", 
      currentAmount: data.currentAmount || 0,
    };
    addBudget(newBudget);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" backgroundColor="#3476F4" translucent={false} />
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <AddBudgetContainer
          control={control}
          errors={errors}
          setValue={setValue}
        />
      </ScrollView>
      <Footer onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3476F4",
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(1),
    backgroundColor: '#fff',
    paddingBottom: moderateScale(100), 
  },
});
