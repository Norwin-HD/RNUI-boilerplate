import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { DateRange, useCalendarModal } from "../hooks/use-calendar-modal";
import { Calendar } from "./Calendar";

type DateRangeValue = DateRange;

interface InputCalendarProps {
  date: DateRangeValue;
  setDate: (date: DateRangeValue) => void;
  error?: string;
}

const InputCalendar = ({ date, setDate, error }: InputCalendarProps) => {
  const { visible, setVisible, displayText, applyDate, syncDisplay } =
    useCalendarModal(setDate);
  const [ready, setReady] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  useEffect(() => {
    syncDisplay(date);
  }, [date, syncDisplay]);

  const getCurrentMonthRange = (): DateRange => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
  };

  const getCurrentQuarterRange = (): DateRange => {
    const now = new Date();
    const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
    const start = new Date(now.getFullYear(), quarterStartMonth, 1);
    const end = new Date(now.getFullYear(), quarterStartMonth + 3, 0);
    return { start, end };
  };

  const handleBadgePress = (type: string) => {
    setSelectedBadge(type);
    if (type === 'mensual') {
      const range = getCurrentMonthRange();
      setDate(range);
    } else if (type === 'trimestral') {
      const range = getCurrentQuarterRange();
      setDate(range);
    } else if (type === 'personalizado') {
      setVisible(true);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Text style={styles.inputHeader}>Periodo</Text>
        
        <View style={styles.badgesContainer}>
          <Pressable
            style={[
              styles.badge,
              selectedBadge === 'mensual' && styles.badgeSelected
            ]}
            onPress={() => handleBadgePress('mensual')}
          >
            <Text style={[
              styles.badgeText,
              selectedBadge === 'mensual' && styles.badgeTextSelected
            ]}>
              Mensual
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.badge,
              selectedBadge === 'trimestral' && styles.badgeSelected
            ]}
            onPress={() => handleBadgePress('trimestral')}
          >
            <Text style={[
              styles.badgeText,
              selectedBadge === 'trimestral' && styles.badgeTextSelected
            ]}>
              Trimestral
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.badge,
              selectedBadge === 'personalizado' && styles.badgeSelected
            ]}
            onPress={() => handleBadgePress('personalizado')}
          >
            <Text style={[
              styles.badgeText,
              selectedBadge === 'personalizado' && styles.badgeTextSelected
            ]}>
              Personalizado
            </Text>
          </Pressable>
        </View>

        <Modal
          isVisible={visible}
          onModalShow={() => setReady(true)}
          onModalHide={() => setReady(false)}
          onSwipeComplete={() => setVisible(false)}
          swipeDirection="down"
          propagateSwipe={true}
          animationInTiming={100}
          animationOutTiming={200}
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            <View style={styles.dragIndicator} />
            {ready && (
              <Calendar
                onApply={(start, end) => {
                  applyDate(start, end);
                  setSelectedBadge('personalizado');
                }}
              />
            )}
          </View>
        </Modal>

        <Pressable
          style={styles.inputContainer}
          onPress={() => setVisible(true)}
        >
          <Text
            style={[
              styles.inputText,
              !date.start && !date.end ? styles.placeholderText : undefined,
            ]}
            numberOfLines={1}
          >
            {displayText}
          </Text>
          <Ionicons
            name="calendar-clear-sharp"
            size={moderateScale(22)}
            color="#3476F4"
          />
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 0,
    marginHorizontal: 0,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    padding: scale(20),
    height: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 20,
  },
  dragIndicator: {
    alignSelf: "center",
    width: scale(60),
    height: scale(5),
    backgroundColor: "#ccc",
    borderRadius: scale(5),
    marginBottom: scale(10),
  },
  inputHeader: {
    fontFamily: "Montserrat_400Regular",
    color: "#454A53",
    marginBottom: scale(4),
    fontSize: moderateScale(14),
  },
  badgesContainer: {
    flexDirection: "row",
    gap: scale(8),
    marginBottom: scale(8),
  },
  badge: {
    backgroundColor: "#e1ebfd",
    borderWidth: 1,
    borderColor: "#9fbffa",
    borderRadius: scale(16),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    alignItems: "center",
    justifyContent: "center",
  },
  badgeSelected: {
    backgroundColor: "#3476f4",
  },
  badgeText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
    color: "#3476f4",
  },
  badgeTextSelected: {
    color: "#ffffff",
  },
  inputContainer: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#C0C3DC",
    paddingVertical: scale(6),
  },
  inputText: {
    flex: 1,
    marginRight: scale(8),
    color: "#181A2A",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
  },
  placeholderText: {
    color: "#6C75AD",
    fontFamily: "Montserrat_400Regular",
  },
  errorText: {
    color: "#FF6B6B",
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(12),
    marginTop: scale(4),
  },
});

export default InputCalendar;
