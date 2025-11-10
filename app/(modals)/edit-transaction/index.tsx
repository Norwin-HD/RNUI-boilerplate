import { useTransactions } from "@/src/features/transacciones/contexts/transactions-context";
import { ExpenseSchema } from "@/src/features/transacciones/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { z } from "zod";

export default function EditTransactionModal() {
  const { id } = useLocalSearchParams() as { id?: string };
  const { transactions, setTransactions } = useTransactions();
  const router = useRouter();

  const tid = Number(id);
  const transaction = transactions.find((t) => t.id === tid);

  type FormData = z.infer<typeof ExpenseSchema>;
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      categoria: transaction?.categoria || "",
      monto: transaction?.monto || 0,
      fecha: transaction?.fecha ? new Date(transaction.fecha) : new Date(),
      descripcion: transaction?.descripcion || "",
      imagen: transaction?.imagen || "",
    },
  });

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ paddingVertical: verticalScale(40), alignItems: "center" }}
        >
          <Text style={styles.title}>Transacción no encontrada</Text>
          <Text style={styles.subtitle}>
            Es posible que haya sido eliminada o el id sea inválido.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = handleSubmit((data) => {
    setTransactions(
      transactions.map((t) =>
        t.id === tid
          ? {
              ...t,
              ...data,
            }
          : t
      )
    );
    router.dismiss();
  });

  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3476F4",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(22),
    color: "#fff",
    marginBottom: verticalScale(12),
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(14),
    color: "#fff",
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
});
