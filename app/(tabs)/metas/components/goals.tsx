import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Card from "./card";

import { GoalsContext } from "@/src/stores/goals";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "expo-router";

const formatShortDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "MMM, yyyy", { locale: es });
};

const Goals = () => {
  const goalsContext = useContext(GoalsContext);
  const router = useRouter();

  if (!goalsContext) {
    throw new Error("GoalsContext must be used within a GoalsProvider");
  }

  const { goals } = goalsContext;

  const handleGoalPress = (goalId: string) => {
    router.push(`/detail-goals?id=${goalId}` as any);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {`Tus Metas Activas (${goals.length})`}
      </Text>
      {goals.map((goal) => (
        <Card key={goal.id} style={styles.goalCard}>
          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <View style={styles.titleRow}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/k5nj3t2l_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={styles.targetIcon}
                />
                <Text style={styles.goalTitle} numberOfLines={3}>
                  {goal.title}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.deadlineText}>{formatShortDate(goal.deadline)}</Text>
                <TouchableOpacity 
                  style={styles.arrowButton}
                  onPress={() => handleGoalPress(goal.id)}
                >
                  <Ionicons name="chevron-forward" size={moderateScale(16)} color="#181a2a" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.progressSection}>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${Math.min(
                          (goal.currentAmount / goal.totalAmount) * 100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.progressTextRow}>
                <Text style={styles.amountText}>
                  {`$${goal.currentAmount.toLocaleString()} de $${goal.totalAmount.toLocaleString()}`}
                </Text>
                <Text style={styles.percentageText}>
                  {`${Math.round(
                    (goal.currentAmount / goal.totalAmount) * 100
                  )}% completado`}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(13),
    marginTop: verticalScale(24),
  },
  headerText: {
    color: "#181a2a",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(18),
    lineHeight: verticalScale(27),
  },
  goalCard: {
    backgroundColor: "#e1ebfd",
    borderColor: "#0b4fd0",
    borderWidth: 1,
    borderRadius: moderateScale(18),
    padding: scale(16),
  },
  cardContent: {
    gap: verticalScale(12),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(3),
    marginHorizontal: scale(4),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    flex: 1,
  },
  targetIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  goalTitle: {
    flex: 1,
    color: "#000000",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    lineHeight: verticalScale(24),

  },
  deadlineText: {
    color: "#181a2a",
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  arrowButton: {
    padding: scale(2),
  },
  progressSection: {
    gap: verticalScale(10),
  },
  progressBarContainer: {
    gap: scale(8),
  },
  progressBarBackground: {
    backgroundColor: "#c2caf2",
    borderColor: "#5e92f7",
    borderWidth: 1,
    borderRadius: 9999,
    height: verticalScale(8),
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#32de83",
    borderRadius: 9999,
  },
  progressTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountText: {
    color: "#181a2a",
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
  percentageText: {
    color: "#181a2a",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
  addButton: {
    backgroundColor: "#0b4fd0",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  addButtonText: {
    color: "#FFFFFF",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
  },
});

export default Goals;
