import { useTransactions } from "@/src/stores/transactions/transactions-context";
import DynamicImage from "@/src/utils/dynamicImage";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Card from "./Card";

const formatRelativeDate = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
}

const RecentTransactions = () => {
  const { transactions } = useTransactions();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{"Transacciones recientes"}</Text>
        <TouchableOpacity onPress={() => alert("Arrow pressed!")}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/s0v15xdo_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.iconArrow}
          />
        </TouchableOpacity>
      </View>
  {transactions.slice(0, 2).map((item, index) => (
        <Card
          key={item.id}
          style={[
            styles.row16,
            index === transactions.slice(0, 2).length - 1
              ? {}
              : { marginBottom: verticalScale(24) },
          ]}
        >
          <View style={styles.iconPlaceholder}>
            <DynamicImage
              path={item.imagen ? `${item.imagen}.webp` : "default"}
              width={moderateScale(50)}
              height={moderateScale(50)}
              borderRadius={999}
            />
          </View>
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
                <Text numberOfLines={1} ellipsizeMode='head' style={styles.textTime}>{formatRelativeDate(item.fecha)}</Text>
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
  iconPlaceholder: {
    backgroundColor: "#c2caf2",
    borderWidth: 1,
    borderColor: "#8590c8",
    borderRadius: 999,
    width: moderateScale(60),
    height: moderateScale(60),
    marginRight: scale(12),
    marginLeft: scale(12),

    alignItems: 'center',
    justifyContent: 'center',
  },
  row16: {
    // IGNORE
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(24),
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
  row13: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(20),
  },
  text27: {
    color: "#000000",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_700Bold",
    marginBottom: verticalScale(16),
  },
  text28: {
    color: "#FB283A",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_700Bold",
  },
});

export default RecentTransactions;
