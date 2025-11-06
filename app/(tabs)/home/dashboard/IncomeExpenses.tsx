
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface InfoCardProps {
    type: 'income' | 'expense';
    amount: number;
}

const InfoCard = ({ type, amount }: InfoCardProps) => {
    const isIncome = type === 'income';
    const title = isIncome ? "Ingresos" : "Gastos";
    const iconUri = isIncome
        ? "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/ef73o05t_expires_30_days.png" // Green up arrow
        : "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/4p9gt8wl_expires_30_days.png"; // Red down arrow

    return (
        <View style={styles.cardContainer}>
            <Image
                source={{ uri: iconUri }}
                resizeMode={"stretch"}
                style={styles.icon}
            />
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardAmount}>{`$${amount.toFixed(2)}`}</Text>
            </View>
        </View>
    );
};


interface IncomeExpensesProps {
    income: number;
    expenses: number;
}

const IncomeExpenses: React.FC<IncomeExpensesProps> = ({ income, expenses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Gastos e Ingresos"}</Text>
      <View style={styles.cardsWrapper}>
        <InfoCard type="expense" amount={expenses} />
        <InfoCard type="income" amount={income} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(16),
        marginBottom: verticalScale(32),
    },
    headerText: {
        color: "#000000",
        fontSize: moderateScale(18),
        marginBottom: verticalScale(28),
        fontFamily: "Montserrat_500Medium",
    },
    cardsWrapper: {
        flexDirection: "row",
        justifyContent: 'space-around',
        gap: scale(26),
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: moderateScale(45),
        height: moderateScale(45),
        marginRight: scale(12),
    },
    cardTitle: {
        color: "#181A2A",
        lineHeight: verticalScale(18),
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_500Medium",
        marginBottom: verticalScale(10),
    },
    cardAmount: {
        color: "#181A2A",
        fontSize: moderateScale(20),
        lineHeight: verticalScale(24),
        fontFamily: "Montserrat_600SemiBold",
    },
});

export default IncomeExpenses;
