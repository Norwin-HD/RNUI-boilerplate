import { useGoalsContext } from "@/src/stores/goals/index";
import { GoalSchema } from "@/src/schema/goalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { z } from "zod";
import AddGoalContainer from "./components/container";
import Footer from "./components/Footer";
import Header from "./components/Header";

type GoalFormData = z.infer<typeof GoalSchema>;

export default function AddGoalModal() {
  const router = useRouter();
  const { addGoal } = useGoalsContext();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      title: "",
      totalAmount: 0,
      currentAmount: 0,
      deadline: "", 
      category: {
        name: "Otros",
        icon: "package",
      },
    },
  });

  const onSubmit = (data: GoalFormData) => {
    const newGoal = {
      ...data,
      id: Math.random().toString(),
      currentAmount: data.currentAmount || 0,
    };
    addGoal(newGoal);
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
        <AddGoalContainer
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
