import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface BalanceCardProps {
  balance: number;
  percentageChange: number;
  period: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  percentageChange,
  period,
}) => {
  const formattedAmount = balance.toFixed(2).split(".");
  const integerPart = formattedAmount[0];
  const decimalPart = formattedAmount[1];

  const isPositiveChange = percentageChange >= 0;
  const iconUri = isPositiveChange
    ? "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/r4e29u3m_expires_30_days.png" // Green up arrow
    : "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/hq8sesz7_expires_30_days.png"; // Red down arrow

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Balance General"}</Text>
      <View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountInteger}>{`${integerPart}`}</Text>
          <Text style={styles.amountDecimal}>{`.${decimalPart}`}</Text>
        </View>
        <View style={styles.analysisContainer}>
          <Image
            source={{ uri: iconUri }}
            resizeMode={"stretch"}
            style={styles.icon}
          />
          <Text
            style={styles.analysisText}
          >{`${isPositiveChange ? "+" : ""}${percentageChange}% ${period}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(19),
    marginHorizontal: scale(16),
  },
  title: {
    color: "#000000",
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: verticalScale(10),
  },
  amountContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: verticalScale(8),
  },
  amountInteger: {
    color: "#000000",
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(34),
  },
  amountDecimal: {
    color: "#000000",
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_500Medium",
    bottom: verticalScale(-10),
  },
  analysisContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(5),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: scale(14),
  },
  analysisText: {
    color: "#000000",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
  },
});

export default BalanceCard;
