import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { z } from "zod";
import { useTransactions } from "../../../src/features/transacciones/contexts/transactions-context";
import { IncomeSchema } from "../../../src/features/transacciones/schemas";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AddIncomeContainer from "./components/container";

type IncomeFormData = z.infer<typeof IncomeSchema>;

export default function AddIncomeModal() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IncomeFormData>({
    resolver: zodResolver(IncomeSchema),
    defaultValues: {
      monto: undefined,
      fecha: new Date(),
      categoria: "",
      descripcion: "",
      imagen: "",
    },
  });

  const onSubmit = (data: IncomeFormData) => {
    const newTransaction = {
      ...data,
      type: "income" as const,
    };
    addTransaction(newTransaction);
    router.dismiss();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" backgroundColor="#3476F4" translucent={false} />
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <AddIncomeContainer
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
  },
});
