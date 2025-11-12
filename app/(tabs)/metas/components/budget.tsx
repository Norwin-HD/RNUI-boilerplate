import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useBudgetsContext } from '../../../../src/stores/budgets/index';
import Card from './card';

interface SecondaryGoalCardProps {
  title: string;
  currentAmount: number;
  period: {
    start: Date | null;
    end: Date | null;
  };
  iconUri: string;
}

const BudgetCard = ({ title, currentAmount, period, iconUri }: SecondaryGoalCardProps) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
  };

  const periodText = period.start && period.end
    ? `${formatDate(period.start)} - ${formatDate(period.end)}`
    : 'Sin período definido';

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
          <Text style={styles.amountText}>{`$${currentAmount} gastado`}</Text>
          <Text style={styles.periodText}>{periodText}</Text>
        </View>
        <View style={styles.remainingContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/4b16t5c0_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.remainingIcon}
          />
          <Text style={styles.remainingText} numberOfLines={2} ellipsizeMode="tail">Presupuesto</Text>
        </View>
      </View>
    </Card>
  );
};

const BudgetsList = () => {
  const { budgets } = useBudgetsContext();

  return (
    <View style={styles.listContainer}>
      <Text style={styles.headerText}>
        {`Tus presupuestos activos (${budgets.length})`}
      </Text>
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          title={budget.category.name}
          currentAmount={budget.currentAmount}
          period={budget.period}
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
    periodText: {
        color: "#666666",
        fontSize: moderateScale(10),
        fontFamily: "Montserrat_400Regular",
        marginTop: verticalScale(2),
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

