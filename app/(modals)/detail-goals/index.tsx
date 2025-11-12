import { GoalsContext } from "@/src/stores/goals/index";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Header from "./components/Header";
import DetailGoalsContainer from "./components/detailContainer";

import ActionButtons from "./components/actionButtons";
import BalanceProgressSection from "./components/balanceProgressSection";
import ContributeButton from "./components/contributeButton";
import DeadlineSection from "./components/deadlineSection";
import RemainingAmountSection from "./components/remainingAmountSection";

const DetailGoals = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const goalsContext = useContext(GoalsContext);

  const { id } = params as { id?: string };

  if (!goalsContext) {
    throw new Error("GoalsContext must be used within a GoalsProvider");
  }

  const { goals } = goalsContext;
  const goal = goals.find((g) => g.id === id);

  const handleContribute = () => {
    if (!goal) return;
    router.push(`/(modals)/set-goal?id=${goal.id}` as any);
  };

  const handleEdit = () => {
    if (!goal) return;
    router.push(`/(modals)/edit-goals?id=${goal.id}` as any);
  };

  const handleDelete = () => {
    if (!goal) return;
    Alert.alert(
      "Eliminar meta",
      "¿Estás seguro que deseas eliminar esta meta? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            if (goalsContext && typeof goalsContext.deleteGoal === "function") {
              goalsContext.deleteGoal(goal.id);
            }
            router.back();
          },
        },
      ]
    );
  };

  if (!goal) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar
          style="light"
          backgroundColor="#3476F4"
          translucent={false}
        />
        <Header />
        <View style={styles.centerContent}>
          <Text style={styles.title}>Meta no encontrada</Text>
          <Text style={styles.subtitle}>
            La meta que buscas no existe o ha sido eliminada.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const remainingAmount = goal.totalAmount - goal.currentAmount;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" backgroundColor="#3476F4" translucent={false} />
      <Header />
      <DetailGoalsContainer>
        <BalanceProgressSection goal={goal} />

        <ContributeButton onPress={handleContribute} />

        <View style={styles.separator} />
        <DeadlineSection deadline={goal.deadline} />

        <RemainingAmountSection remainingAmount={remainingAmount} />
      </DetailGoalsContainer>
      <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10),
    backgroundColor: "#3476F4",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    color: "#fff",
    marginBottom: verticalScale(12),
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    color: "#fff",
    textAlign: "center",
    opacity: 0.8,
  },
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    gap: verticalScale(16),
  },
  mainTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    color: "#181A2A",
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#e1ebfd",
    borderColor: "#0b4fd0",
    borderWidth: 1,
    borderRadius: moderateScale(18),
    padding: scale(20),
  },
  cardContent: {
    gap: verticalScale(16),
  },
  goalTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(20),
    color: "#181A2A",
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(4),
  },
  label: {
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
    color: "#181A2A",
  },
  value: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(14),
    color: "#3476F4",
  },
  progressSection: {
    marginTop: verticalScale(8),
  },
  progressBarBackground: {
    backgroundColor: "#c2caf2",
    borderColor: "#5e92f7",
    borderWidth: 1,
    borderRadius: 9999,
    height: verticalScale(12),
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#32de83",
    borderRadius: 9999,
  },
  separator: {
    height: 0,
    width: "100%",
  },
});

export default DetailGoals;
