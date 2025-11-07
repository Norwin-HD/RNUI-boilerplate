import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useRangeContext } from "../../contexts/context-range/dataContext";
import { useCategoryContext } from "../../contexts/contexts-category/dataContext";
import Card from "./Card";

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  imagen: string;
}

interface TransactionsCardProps {
  transactions: Transaction[];
}

/**
 * Formatea una fecha a un formato corto (ej. "5 nov").
 * @param date La fecha a formatear.
 * @returns Una cadena de texto con la fecha corta.
 */
const formatShortDate = (date: Date) => {
  return formatDistanceToNow(date, {addSuffix: true, locale: es});
};

const TransactionsCard = ({ transactions }: TransactionsCardProps) => {
  const { selectedCategories } = useCategoryContext();
  const { minValue, maxValue } = useRangeContext();

  // Filtrar por categorías
  const categoryFiltered = useMemo(() => {
    if (selectedCategories.length === 0) return transactions;
    return transactions.filter(t => selectedCategories.includes(t.categoria));
  }, [transactions, selectedCategories]);

  // Filtrar por rango
  const filteredTransactions = useMemo(() => {
    let filtered = categoryFiltered;
    if (minValue !== null || maxValue !== null) {
      filtered = filtered.filter(t => {
        const absMonto = Math.abs(t.monto);
        return (minValue === null || absMonto >= minValue) && (maxValue === null || absMonto <= maxValue);
      });
    }
    return filtered;
  }, [categoryFiltered, minValue, maxValue]);

  return (
    <View>
      <View style={styles.header}>
        <Text
          style={styles.headerText}
        >{`Gastos e Ingresos (${filteredTransactions.length})`}</Text>
      </View>
      {filteredTransactions.map((item, index) => (
        <Card
          key={item.id}
          style={[
            styles.row16,
            index === transactions.length - 1
              ? {}
              : { marginBottom: verticalScale(24) },
          ]}
        >
          <Image
            source={{
              uri: item.imagen,
            }}
            resizeMode={"stretch"}
            style={styles.iconOne}
          />
          <View style={styles.row3}>
            <View style={styles.column12}>
              <Text style={styles.textHeaderCard}>{item.categoria}</Text>
              <View style={styles.row12}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/owykmtoc_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={styles.image10}
                />

                <Text style={styles.textTime}>
                  {formatShortDate(item.fecha)}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => alert("Arrow pressed!")}>
                <View style={styles.view4}>
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/0s8o6qbm_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={styles.iconArrow}
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={item.monto > 0 ? styles.text26 : styles.text28}
              >{`${item.monto > 0 ? "+" : "-"} $${Math.abs(
                item.monto
              )} `}</Text>
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
  iconArrow: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  row16: {
    // IGNORE
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(24),
  },
  iconOne: {
    borderRadius: moderateScale(18),
    width: moderateScale(60),
    height: moderateScale(60),
    marginHorizontal: scale(16),
  },
  row3: {
    // IGNORE
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(12),
  },
  column12: {
    flex: 1,
    marginRight: scale(12),
  },
  textHeaderCard: {
    color: "#000000",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_700Bold",
    marginBottom: verticalScale(16),
  },
  row12: {
    flexDirection: "row",
    alignItems: "center",
  },
  image10: {
    // IGNORE
    width: moderateScale(15),
    height: moderateScale(15),
    marginRight: scale(10),
  },
  textTime: {
    color: "#000000",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(12),
    flex: 1,
  },
  view4: {
    // IGNORE
    alignItems: "flex-end",
    marginBottom: verticalScale(16),
  },
  text26: {
    color: "#1FC16B",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_700Bold",
  },
  text28: {
    color: "#FB283A",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_700Bold",
  },
});

export default TransactionsCard;
