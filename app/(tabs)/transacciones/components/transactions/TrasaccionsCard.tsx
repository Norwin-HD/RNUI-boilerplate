import { categories } from "@/src/mockups/categories-filter";
import { useCategoryContext } from "@/src/stores/categories/CategoryContext";
import { useRangeContext } from "@/src/stores/transactions/RangeContext";
import DynamicImage from "@/src/utils/dynamicImage";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Card from "./Card";

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  imageUri: string;
  descripcion?: string;
}

interface TransactionsCardProps {
  transactions: Transaction[];
}

const formatShortDate = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
};

const getCategoryIcon = (categoria: string) => {
  const category = categories.find(cat => cat.title === categoria);
  return category?.imageUri || "package";
};

const TransactionsCard = ({ transactions }: TransactionsCardProps) => {
  const { selectedCategories } = useCategoryContext();
  const { minValue, maxValue } = useRangeContext();
  const router = useRouter();

  // Filter by categories
  const categoryFiltered = useMemo(() => {
    if (selectedCategories.length === 0) return transactions;
    return transactions.filter((t) => selectedCategories.includes(t.categoria));
  }, [transactions, selectedCategories]);

  // Filter by range
  const filteredTransactions = useMemo(() => {
    let filtered = categoryFiltered;
    if (minValue !== null || maxValue !== null) {
      filtered = filtered.filter((t) => {
        const absMonto = Math.abs(t.monto);
        return (
          (minValue === null || absMonto >= minValue) &&
          (maxValue === null || absMonto <= maxValue)
        );
      });
    }
    return filtered;
  }, [categoryFiltered, minValue, maxValue]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {`Gastos e Ingresos (${filteredTransactions.length})`}
        </Text>
      </View>
      {filteredTransactions.map((item, index) => (
        <Card
          key={item.id}
          style={[
            styles.cardContainer,
            index === filteredTransactions.length - 1
              ? {}
              : { marginBottom: verticalScale(24) },
          ]}
        >
          <View style={styles.iconContainer}>
            <DynamicImage
              path={`${getCategoryIcon(item.categoria)}.webp`}
              width={moderateScale(50)}
              height={moderateScale(50)}
              borderRadius={999}
            />
          </View>
          <View style={styles.contentRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.categoryText}>{item.categoria}</Text>
              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={moderateScale(15)} color="#000000" style={{ marginRight: scale(10) }} />
                <Text style={styles.timeText}>
                  {formatShortDate(item.fecha)}
                </Text>
              </View>
            </View>
            <View style={styles.amountColumn}>
              <TouchableOpacity
                onPress={() => {
                  const url = `/(modals)/detail-transactions?id=${encodeURIComponent(
                    item.id.toString()
                  )}`;
                  router.push(url as any);
                }}
              >
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={moderateScale(24)} color="#000000" />
                </View>
              </TouchableOpacity>
              <Text
                style={
                  item.monto > 0 ? styles.positiveAmount : styles.negativeAmount
                }
              >
                {`${item.monto > 0 ? "+" : "-"} $${Math.abs(item.monto)} `}
              </Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(25),
  },
  headerText: {
    color: "#000000",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(18),
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(20),
  },
  iconContainer: {
    borderRadius: 999,
    width: moderateScale(60),
    height: moderateScale(60),
    marginHorizontal: scale(16),
    backgroundColor: "#c2caf2",
    borderWidth: 1,
    borderColor: "#8590c8",
    alignItems: "center",
    justifyContent: "center",
  },
  iconPlaceholderText: {
    fontSize: moderateScale(24),
    fontFamily: "Montserrat_700Bold",
    color: "#016EED",
  },
  contentRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(12),
  },
  detailsColumn: {
    flex: 1,
    marginRight: scale(12),
  },
  categoryText: {
    color: "#000000",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_700Bold",
    marginBottom: verticalScale(16),
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#000000",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(12),
    flex: 1,
  },
  amountColumn: {
    alignItems: "flex-end",
  },
  arrowContainer: {
    marginBottom: verticalScale(16),
  },
  positiveAmount: {
    color: "#1FC16B",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_700Bold",
  },
  negativeAmount: {
    color: "#FB283A",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_700Bold",
  },
});

export default TransactionsCard;
