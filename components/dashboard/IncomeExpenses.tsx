
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const IncomeExpenses: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Gastos e Ingresos"}</Text>
      <View style={styles.gastosIngresosContainer}>
        <View style={styles.gastosContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/4p9gt8wl_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.iconArrow}
          />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>{"Gastos"}</Text>
            <Text style={styles.secondText}>{"$110.17"}</Text>
          </View>
        </View>
        <View style={styles.IngresosContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/ef73o05t_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.iconArrow}
          />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>{"Ingresos"}</Text>
            <Text style={styles.secondText}>{"$110.17"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: verticalScale(16),
        marginBottom: verticalScale(32),
    },
    headerText: {
        color: "#000000",
        fontSize: moderateScale(18),
        marginBottom: verticalScale(28),
        fontFamily: "Montserrat_500Medium",
    },
    gastosIngresosContainer: {
        flexDirection: "row",
        gap: scale(26),
        borderRadius: moderateScale(18),
        paddingRight: scale(12),
        marginHorizontal: scale(10),
    },
    gastosContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    iconArrow: {
        width: moderateScale(45),
        height: moderateScale(45),
        marginRight: scale(12),
    },
    containerText: {
        marginRight: scale(3),
    },
    mainText: {
        color: "#181A2A",
        lineHeight: verticalScale(18),
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_500Medium",
        marginBottom: verticalScale(10),
    },
    secondText: {
        color: "#181A2A",
        fontSize: moderateScale(20),
        lineHeight: verticalScale(24),
        fontFamily: "Montserrat_600SemiBold",
    },
    IngresosContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default IncomeExpenses;
