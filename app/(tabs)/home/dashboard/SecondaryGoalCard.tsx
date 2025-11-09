import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Card from './Card';

interface SecondaryGoalCardProps {
  title: string;
  currentAmount: number;
  totalAmount: number;
  iconUri: string;
}

const SecondaryGoalCard = ({ title, currentAmount, totalAmount, iconUri }: SecondaryGoalCardProps) => {
  const remainingAmount = totalAmount - currentAmount;

  return (
    <Card style={styles.container}>
      <Image
        source={{ uri: iconUri }}
        resizeMode={"stretch"}
        style={styles.icon}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amountText}>{`$${currentAmount} de $${totalAmount}`}</Text>
        </View>
        <View style={styles.remainingContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/4b16t5c0_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.remainingIcon}
          />
          <Text style={styles.remainingText}>{`$${remainingAmount} restante`}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: verticalScale(20),
        marginBottom: verticalScale(24),
    },
    icon: {
        borderRadius: moderateScale(18),
        width: moderateScale(60),
        height: moderateScale(60),
        marginHorizontal: scale(16),
    },
    detailsContainer: {
        flex: 1,
        flexDirection: "row",
        marginRight: scale(12),
    },
    textContainer: {
        flex: 1,
        marginRight: scale(12),
    },
    title: {
        color: "#000000",
        fontSize: moderateScale(16),
        fontFamily: "Montserrat_700Bold",
        marginBottom: verticalScale(16),
    },
    amountText: {
        color: "#000000",
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_500Medium",
    },
    remainingContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    remainingIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
        marginBottom: verticalScale(16),
    },
    remainingText: {
        color: "#181A2A",
        fontSize: moderateScale(12),
    },
});

export default SecondaryGoalCard;