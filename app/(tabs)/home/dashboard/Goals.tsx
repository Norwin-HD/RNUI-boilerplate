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

const Goals: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <Text style={styles.headerText}>{"Metas y presupuestos"}</Text>
        <TouchableOpacity onPress={() => alert("Arrow pressed!")}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/bfp1jzo4_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.iconArrow}
          />
        </TouchableOpacity>
      </View>
      <Card style={styles.containerCard}>
        <View style={styles.CardOne}>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/k5nj3t2l_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.iconCardOne}
            />
            <Text style={styles.textHeader}>{"Meta"}</Text>
          </View>
          <TouchableOpacity onPress={() => alert("Arrow pressed!")}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/hkb0naka_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.iconArrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.middleText}>{"Vacaciones Europa"}</Text>
          <Text style={styles.timeText}>{"dic, 2025"}</Text>
        </View>
        <View style={styles.porcentaje}>
          <View style={styles.containerPorcentaje}>
            <View style={styles.box}></View>
          </View>
          <View style={styles.footerCardOne}>
            <Text style={styles.textFooter}>{"$165 de $5,000"}</Text>
            <Text style={styles.timeText}>{"65% completado"}</Text>
          </View>
        </View>
      </Card>
      <Card style={styles.row13}>
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/gk7orci1_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={styles.iconHome}
        />
        <View style={styles.row14}>
          <View style={styles.column12}>
            <Text style={styles.textHeaderCardTwo}>{"Casa"}</Text>
            <Text style={styles.monto}>{"$100 de $500"}</Text>
          </View>
          <View style={styles.column13}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/4b16t5c0_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image9}
            />
            <Text style={styles.textRestante}>{"$400 restante"}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(3),
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(22),
    marginHorizontal: scale(2),
  },
  headerText: {
    color: "#000000",
    fontSize: moderateScale(18),
    fontFamily: "Montserrat_500Medium",
  },
  iconArrow: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  containerCard: {
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(24),
  },
  CardOne: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
    marginHorizontal: scale(17),
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(12),
  },
  iconCardOne: {
    width: moderateScale(22),
    height: moderateScale(23),
    marginRight: scale(8),
  },
  textHeader: {
    color: "#000000",
    fontSize: moderateScale(10),
    fontFamily: "Montserrat_700Bold",
    flex: 1,
  },
  middleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(13),
    marginHorizontal: scale(16),
  },
  middleText: {
    color: "#000000",
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(13),
    lineHeight: verticalScale(24),
    flex: 1,
  },
  timeText: {
    color: "#000000",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_500Medium",
    textAlign: "right",
    flex: 1,
  },
  porcentaje: {
    marginHorizontal: scale(12),
  },
  containerPorcentaje: {
    backgroundColor: "#C2CAF2",
    borderColor: "#5E92F7",
    borderRadius: 9999,
    borderWidth: 1,
    marginBottom: verticalScale(10),
  },
  box: {
    width: scale(121),
    height: verticalScale(8),
    backgroundColor: "#32DE83",
    borderRadius: 9999,
  },
  footerCardOne: {
    flexDirection: "row",
    alignItems: "center",
  },
  textFooter: {
    color: "#181A2A",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_500Medium",
    flex: 1,
  },
  row13: {
    // IGNORE
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(20),
  },
  iconHome: {
    borderRadius: moderateScale(18),
    width: moderateScale(60),
    height: moderateScale(60),
    marginHorizontal: scale(16),
  },
  row14: {
    // IGNORE
    flex: 1,
    flexDirection: "row",
    marginRight: scale(12),
  },
  column12: {
    // IGNORE
    flex: 1,
    marginRight: scale(12),
  },
  textHeaderCardTwo: {
    color: "#000000",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_700Bold",
    marginBottom: verticalScale(16),
  },
  monto: {
    color: "#000000",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_500Medium",
  },
  column13: { // IGNORE
    flex: 1,
    alignItems: "flex-end",
  },
  image9: { // IGNORE
    width: moderateScale(24),
    height: moderateScale(24),
    marginBottom: verticalScale(16),
  },
  textRestante: {
    color: "#181A2A",
    fontSize: moderateScale(12),
  },
});

export default Goals;
