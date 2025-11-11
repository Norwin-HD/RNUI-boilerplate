import { Ionicons } from "@expo/vector-icons";
import { differenceInDays, format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface DeadlineSectionProps {
  deadline: string;
}

const DeadlineSection = ({ deadline }: DeadlineSectionProps) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysRemaining = differenceInDays(deadlineDate, today);

  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM, yyyy", { locale: es });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Fecha límite</Text>

      {/* Input de fecha */}
      <View style={styles.dateInput}>
        <Text style={styles.dateText}>{formatDate(deadlineDate)}</Text>
        <Ionicons name="calendar" size={moderateScale(20)} color="#3476f4" />
      </View>

      {/* Días restantes */}
      <View style={styles.daysRemaining}>
        <Ionicons name="information-circle" size={moderateScale(16)} color="#181a2a" />
        <Text style={styles.daysText}>
          {daysRemaining > 0 ? `${daysRemaining} días restantes` : "Fecha límite alcanzada"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(8),
  },
  sectionTitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    color: "#181a2a",
    lineHeight: verticalScale(24),
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#6c75ad",
    height: verticalScale(48),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(12),
  },
  dateText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(20),
    color: "#181a2a",
    lineHeight: verticalScale(20),
    flex: 1,
  },
  daysRemaining: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    paddingHorizontal: scale(8),
  },
  daysText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    color: "#181a2a",
    lineHeight: verticalScale(18),
    flex: 1,
  },
});

export default DeadlineSection;