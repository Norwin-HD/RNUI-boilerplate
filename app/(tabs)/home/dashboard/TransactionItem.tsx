import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Card from './Card';

export interface Transaction {
    id: number;
    categoria: string;
    monto: number;
    fecha: Date;
    imagen: string;
    type: 'income' | 'expense';
}

interface TransactionItemProps {
    transaction: Transaction;
    onPress: () => void;
}

const TransactionItem = ({ transaction, onPress }: TransactionItemProps) => {
    const { categoria, monto, fecha, imagen } = transaction;
    const isIncome = monto > 0;
    const amountColor = isIncome ? styles.incomeAmount : styles.expenseAmount;
    const formattedDate = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
    });

    return (
        <Card style={styles.container}>
            <Image
                source={{ uri: imagen }}
                resizeMode={"stretch"}
                style={styles.icon}
            />
            <View style={styles.detailsContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.categoryText}>{categoria}</Text>
                    <View style={styles.dateContainer}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/owykmtoc_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.calendarIcon}
                        />
                        <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <TouchableOpacity onPress={onPress}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/0s8o6qbm_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={amountColor}>{`${isIncome ? "+" : "-"} $${Math.abs(monto)}`}</Text>
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
        alignItems: "center",
        marginRight: scale(12),
    },
    infoContainer: {
        flex: 1,
        marginRight: scale(12),
    },
    categoryText: {
        color: "#000000",
        fontSize: moderateScale(16),
        fontFamily: "Montserrat_700Bold",
        marginBottom: verticalScale(16),
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    calendarIcon: {
        width: moderateScale(15),
        height: moderateScale(15),
        marginRight: scale(10),
    },
    dateText: {
        color: "#000000",
        fontFamily: "Montserrat_500Medium",
        fontSize: moderateScale(12),
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    arrowIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
        marginBottom: verticalScale(16),
    },
    incomeAmount: {
        color: "#1FC16B",
        fontSize: moderateScale(18),
        fontFamily: "Montserrat_700Bold",
    },
    expenseAmount: {
        color: "#FB283A",
        fontSize: moderateScale(18),
        fontFamily: "Montserrat_700Bold",
    },
});

export default TransactionItem;