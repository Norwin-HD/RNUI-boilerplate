import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { useCalendarModal } from "../hooks/use-calendar-modal";
import { Calendar } from "./Calendar";

type DateValue = Date | null;

interface InputCalendarProps {
  date: DateValue;
  setDate: (date: DateValue) => void;
}

const InputCalendar = ({ date, setDate }: InputCalendarProps) => {
  const { visible, setVisible, displayText, applyDate, syncDisplay } =
    useCalendarModal(setDate);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    syncDisplay(date);
  }, [date, syncDisplay]);

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
                onApply={({ endDate }) =>
                  applyDate(endDate || null)
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
              !date ? styles.placeholderText : undefined,
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
