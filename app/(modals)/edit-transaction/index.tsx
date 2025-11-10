import { categories } from "@/app/mockups/categories-filter";
import { TransactionDetailProvider } from "@/shared/TransactionDetailContext";
import { useCategoryContext } from "@/src/features/add-goals/contexts/CategoryContext";
import { useTransactions } from "@/src/features/transacciones/contexts/transactions-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import FieldComponent from "./components/fieldComponente";
import Footer from "./components/Footer";
import Header from "./components/Header";

type FormData = {
  monto: number;
  fecha: Date;
  descripcion: string;
  imagen: string;
  categoria: string;
};

export default function EditTransactionModal() {
  const { id } = useLocalSearchParams() as { id?: string };
  const { transactions, setTransactions } = useTransactions();
  const { selectedCategories } = useCategoryContext();
  const router = useRouter();

  const tid = Number(id);
  const transaction = transactions.find((t) => t.id === tid);

  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      monto: transaction ? Math.abs(transaction.monto || 0) : 0,
      fecha: transaction?.fecha ? new Date(transaction.fecha) : new Date(),
      descripcion: transaction?.descripcion || "",
      imagen: transaction?.imagen || transaction?.imageUri || "",
      categoria: transaction?.categoria || selectedCategories[0] || "",
    },
  });

  // Update categoria when selectedCategories changes
  React.useEffect(() => {
    if (selectedCategories.length > 0) {
      setValue('categoria', selectedCategories[0]);
    }
  }, [selectedCategories, setValue]);

  const handleSave = (data: FormData) => {
    console.log('handleSave called with data:', data);
    if (!transaction) {
      console.log('No transaction found');
      return;
    }
    
    // Find the category icon
    const categoryData = categories.find((cat: any) => cat.title === data.categoria);
    const categoryImageUri = categoryData?.imageUri || "package";
    
    const signedAmount = transaction.type === "income" ? data.monto : -data.monto;
    console.log('Signed amount:', signedAmount);
    
    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id
        ? {
            ...t,
            ...data,
            monto: signedAmount,
            fecha: new Date(data.fecha),
            imageUri: categoryImageUri,
          }
        : t
    );
    
    console.log('Updated transactions:', updatedTransactions);
    setTransactions(updatedTransactions);
    router.dismiss();
  };

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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" backgroundColor="#3476F4" translucent={false} />
      <Header title="Editar transacción" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(40) }}
      >
        <View style={styles.panel}>
          <TransactionDetailProvider transaction={transaction}>
            <FieldComponent isEditable={true} control={control} />
          </TransactionDetailProvider>
        </View>
      </ScrollView>
      <Footer onSave={() => {
        console.log('Footer onSave called');
        handleSubmit(handleSave)();
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10),
    backgroundColor: "#3476F4",
  },
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    gap: verticalScale(16),
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
