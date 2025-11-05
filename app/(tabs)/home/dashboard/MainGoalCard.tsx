import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Card from './Card';

interface MainGoalCardProps {
  title: string;
  deadline: string;
  currentAmount: number;
  totalAmount: number;
  onPress: () => void;
}

const MainGoalCard = ({ title, deadline, currentAmount, totalAmount, onPress } : MainGoalCardProps) => {
  const percentage = totalAmount > 0 ? Math.round((currentAmount / totalAmount) * 100) : 0;

  return (
    <Card style={styles.containerCard}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardHeader}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/k5nj3t2l_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.goalIcon}
          />
          <Text style={styles.goalType}>{"Meta"}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/hkb0naka_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.goalTitle}>{title}</Text>
        <Text style={styles.deadlineText}>{deadline}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]}></View>
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.amountText}>{`$${currentAmount} de $${totalAmount}`}</Text>
          <Text style={styles.percentageText}>{`${percentage}% completado`}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    containerCard: {
        paddingVertical: verticalScale(20),
        marginBottom: verticalScale(24),
    },
    cardTopRow: {
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
    goalIcon: {
        width: moderateScale(22),
        height: moderateScale(23),
        marginRight: scale(8),
    },
    goalType: {
        color: "#000000",
        fontSize: moderateScale(10),
        fontFamily: "Montserrat_700Bold",
        flex: 1,
    },
    arrowIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    middleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(13),
        marginHorizontal: scale(16),
    },
    goalTitle: {
        color: "#000000",
        fontFamily: "Montserrat_700Bold",
        fontSize: moderateScale(13),
        lineHeight: verticalScale(24),
        flex: 1,
    },
    deadlineText: {
        color: "#000000",
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_500Medium",
        textAlign: "right",
    },
    progressContainer: {
        marginHorizontal: scale(12),
    },
    progressBarBackground: {
        backgroundColor: "#C2CAF2",
        borderColor: "#5E92F7",
        borderRadius: 9999,
        borderWidth: 1,
        height: verticalScale(10),
        marginBottom: verticalScale(10),
        overflow: 'hidden',
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#32DE83",
        borderRadius: 9999,
    },
    progressTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    amountText: {
        color: "#181A2A",
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_500Medium",
    },
    percentageText: {
        color: "#181A2A",
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_500Medium",
    },
});

export default MainGoalCard;