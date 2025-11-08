import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { useCalendarModal } from "../hooks/use-calendar-modal";
import { Calendar } from "../../new-income/components/Calendar";

type DateRange = [Date, Date] | null;

interface InputCalendarProps {
  dates: DateRange;
  setDates: (dates: DateRange) => void;
}

const InputCalendar = ({ dates, setDates }: InputCalendarProps) => {
  const { visible, setVisible, displayText, applyRange, syncDisplay } =
    useCalendarModal(setDates);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    syncDisplay(dates);
  }, [dates, syncDisplay]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Text style={styles.inputHeader}>Fecha limite</Text>
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
                onApply={({ startDate, endDate }) =>
                  applyRange(startDate && endDate ? [startDate, endDate] : null)
                }
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
              !dates ? styles.placeholderText : undefined,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
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
});

export default InputCalendar;
