import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { presupuestosMackup } from '../../../mackups/presupuestos-mackup';
import Card from './card';

interface SecondaryGoalCardProps {
  title: string;
  currentAmount: number;
  totalAmount: number;
  iconUri: string;
}

const BudgetCard = ({ title, currentAmount, totalAmount, iconUri }: SecondaryGoalCardProps) => {
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
          <Text style={styles.title} >{title}</Text>
          <Text style={styles.amountText}>{`$${currentAmount} de $${totalAmount}`}</Text>
        </View>
        <View style={styles.remainingContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/4b16t5c0_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.remainingIcon}
          />
          <Text style={styles.remainingText} numberOfLines={2} ellipsizeMode="tail">{`$${remainingAmount} restante`}</Text>
        </View>
      </View>
    </Card>
  );
};

const BudgetsList = () => {
  const { budgets } = presupuestosMackup;

  return (
    <View style={styles.listContainer}>
      <Text style={styles.headerText}>
        {`Tus presupuestos activos (${budgets.length})`}
      </Text>
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          title={budget.title}
          currentAmount={budget.currentAmount}
          totalAmount={budget.totalAmount}
          iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/gk7orci1_expires_30_days.png"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: verticalScale(14),
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
        alignItems: "center",
    },
    textContainer: {
        flex: 2,
        marginRight: scale(12),
    },
    title: {
        color: "#000000",
        fontSize: moderateScale(16),
        fontFamily: "Montserrat_600SemiBold",
        marginBottom: verticalScale(10),
    },
    amountText: {
        color: "#000000",
        fontSize: moderateScale(11),
        fontFamily: "Montserrat_500Medium",
    },
    remainingContainer: {
        gap: verticalScale(4),
        alignItems: "flex-end",
        justifyContent: "center",
    },
    remainingIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
        marginBottom: verticalScale(4),
    },
    remainingText: {
        color: "#181A2A",
        fontSize: moderateScale(11),
        fontFamily: "Montserrat_400Regular",
        textAlign: "right",
    },
    listContainer: {
        paddingVertical: verticalScale(16),
    },
    headerText: {
        marginTop: verticalScale(10),
        fontSize: moderateScale(18),
        fontFamily: "Montserrat_500Medium",
        color: "#000000",
        marginBottom: verticalScale(16),
    },
});

export default BudgetsList;
export { BudgetCard };

