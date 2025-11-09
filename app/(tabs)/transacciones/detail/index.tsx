import DynamicImage from "@/types/components/dynamicImage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const TransactionDetail = () => {
  const { id, categoria, monto, fecha, imagen } = useLocalSearchParams();
  const router = useRouter();

  // Since params are strings, parse them
  const { descripcion } = useLocalSearchParams();

  const transaction = {
    id: parseInt(id as string),
    categoria: categoria as string,
    monto: parseFloat(monto as string),
    fecha: new Date(fecha as string),
    imageUri: imagen as string,
    descripcion: (descripcion as string) || "",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <View style={styles.iconContainer}>
          <DynamicImage
            path={`${transaction.imageUri}.webp`}
            width={moderateScale(80)}
            height={moderateScale(80)}
            borderRadius={moderateScale(40)}
          />
        </View>
        <Text style={styles.category}>{transaction.categoria}</Text>
        {transaction.descripcion ? (
          <Text style={styles.description}>{transaction.descripcion}</Text>
        ) : null}
        <Text
          style={
            transaction.monto > 0
              ? styles.positiveAmount
              : styles.negativeAmount
          }
        >
          {transaction.monto > 0 ? "+" : "-"}${Math.abs(transaction.monto)}
        </Text>
        <Text style={styles.date}>
          {transaction.fecha.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backText: {
    fontSize: moderateScale(16),
    color: "#016EED",
  },
  detailContainer: {
    alignItems: "center",
  },
  iconContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: "#E1EBFD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },
  iconText: {
    fontSize: moderateScale(32),
    fontFamily: "Montserrat_700Bold",
    color: "#016EED",
  },
  category: {
    fontSize: moderateScale(24),
    fontFamily: "Montserrat_700Bold",
    color: "#000",
    marginBottom: verticalScale(10),
  },
  description: {
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_500Medium",
    color: "#666",
    textAlign: "center",
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(8),
  },
  positiveAmount: {
    fontSize: moderateScale(28),
    fontFamily: "Montserrat_700Bold",
    color: "#1FC16B",
    marginBottom: verticalScale(10),
  },
  negativeAmount: {
    fontSize: moderateScale(28),
    fontFamily: "Montserrat_700Bold",
    color: "#FB283A",
    marginBottom: verticalScale(10),
  },
  date: {
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_500Medium",
    color: "#000",
  },
});

export default TransactionDetail;
