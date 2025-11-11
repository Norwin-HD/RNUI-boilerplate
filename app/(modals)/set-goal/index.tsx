import { GoalsContext } from "@/src/features/add-goals/contexts";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Header from "./components/Header";
import BalanceProgressSection from "./components/balanceProgressSection";
import PanelContainer from "./components/container";
import PreviewSection from "./components/previewSection";
import SuggestedAmounts from "./components/suggestedAmounts";

const SetGoal = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const goalsContext = useContext(GoalsContext);

  const { id } = params as { id?: string };

  if (!goalsContext) {
    throw new Error("GoalsContext must be used within a GoalsProvider");
  }

  const { goals } = goalsContext;
  const goal = goals.find((g) => g.id === id);
  const [amount, setAmount] = useState("");
  const insets = useSafeAreaInsets();

  const handleContribute = () => {
    if (!goal) return;
    const parsed = Number(amount.toString().replace(/[^0-9.-]+/g, ""));

    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert(
        "Cantidad inválida",
        "Ingresa una cantidad válida para aportar."
      );
      return;
    }

    if (goalsContext && typeof goalsContext.updateGoal === "function") {
      goalsContext.updateGoal(goal.id, parsed);
    }
    router.back();
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

  const parsedForLabel = Number(amount.toString().replace(/[^0-9.-]+/g, ""));
  const displayAmount = !isNaN(parsedForLabel) && parsedForLabel > 0 ? parsedForLabel : 0;
  const isFooterDisabled = displayAmount <= 0;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#3476F4" translucent={false} />
      <Header />
      <PanelContainer>
        <BalanceProgressSection goal={goal} />

        {/* Input para aportar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aportar a la meta</Text>

          <View style={styles.inputRow}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <SuggestedAmounts onSelect={(v) => setAmount(String(v))} />

          <PreviewSection
            currentAmount={goal.currentAmount + (Number(amount) || 0)}
            totalAmount={goal.totalAmount}
          />
        </View>
      </PanelContainer>
      {/* Footer fixed button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + verticalScale(8) }]}> 
        <TouchableOpacity
          style={[styles.footerButton, isFooterDisabled && styles.footerButtonDisabled]}
          onPress={handleContribute}
          accessibilityRole="button"
          disabled={isFooterDisabled}
        >
          <Text style={styles.footerButtonText}>{displayAmount > 0 ? `Aportar $${displayAmount.toLocaleString()}` : 'Aportar'}</Text>
          <Ionicons name="add" size={moderateScale(16)} color="#fff" />
        </TouchableOpacity>
      </View>
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
  section: {
    gap: verticalScale(8),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontFamily: 'Montserrat_500Medium',
    color: '#181a2a',
    fontSize: moderateScale(14),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#6c75ad',
    height: 48,
    paddingHorizontal: 8,
    gap: 8,
  },
  currency: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: moderateScale(24),
    color: '#3476f4',
  },
  input: {
    flex: 1,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: moderateScale(20),
    color: '#181a2a',
    paddingVertical: 0,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderTopWidth: 0.5,
    borderTopColor: '#e6e9f2',
  },
  footerButton: {
    backgroundColor: '#1FC16B',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  footerButtonDisabled: {
    opacity: 0.6,
  },
  footerButtonText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

export default SetGoal;
