import { useTransactions } from "@/src/features/transacciones/contexts/transactions-context";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { TransactionDetailProvider } from "./TransactionDetailContext";
import Header from "./components/Header";
import FieldComponent from "./components/fieldComponente";

const TransactionDetail = () => {
  const params = useLocalSearchParams();
  const { id } = params as { id?: string };
  const { transactions } = useTransactions();

  const tid = Number(id);
  const found = transactions.find((t) => t.id === tid);

  const transaction =
    found ||
    (params && (params as any).categoria
      ? {
          id: tid || -1,
          categoria: (params as any).categoria,
          monto:
            params && (params as any).monto
              ? parseFloat((params as any).monto)
              : 0,
          fecha:
            params && (params as any).fecha
              ? new Date((params as any).fecha)
              : new Date(),
          descripcion: (params as any).descripcion || "",
          imagen:
            (params as any).imagen || (params as any).imageUri || "default",
          imageUri:
            (params as any).imageUri ||
            (params as any).imagen ||
            (params as any).imageUri ||
            "default",
          type:
            (params as any).type ||
            (params && (params as any).monto > 0 ? "income" : "expense"),
        }
      : null);

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar
          style="light"
          backgroundColor="#3476F4"
          translucent={false}
        />
        <View
          style={{ paddingVertical: verticalScale(40), alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: moderateScale(22),
              color: "#fff",
              marginBottom: verticalScale(12),
            }}
          >
            Transacción no encontrada
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: moderateScale(14),
              color: "#fff",
              textAlign: "center",
              width: "80%",
            }}
          >
            Es posible que haya sido eliminada o el id sea inválido.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" backgroundColor="#3476F4" translucent={false} />
      <Header title="Detalle transacción" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(40) }}
      >
        <View style={styles.panel}>
          <TransactionDetailProvider transaction={transaction as any}>
            <FieldComponent />
          </TransactionDetailProvider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10),
    backgroundColor: "#3476F4",
  },
  panel: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    gap: verticalScale(16),
  },
});

export default TransactionDetail;
