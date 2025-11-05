import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { useCalendarModal } from "../../hooks/hooks-filter/use-calendar-modal";
import { Calendar } from "./Calendar";

type DateRange = [Date, Date] | null;


interface InputCalendarProps {
  dates: DateRange;
  setDates: (dates: DateRange) => void;
}

const InputCalendar = ({ dates, setDates }: InputCalendarProps) => {
  const {
    modalVisible,
    setModalVisible,
    showContent,
    setShowContent,
    handleApplyDate,
    displayedDate,
    updateDisplayedDates,
  } = useCalendarModal(setDates);

  useEffect(() => {
    updateDisplayedDates(dates);
  }, [dates, updateDisplayedDates]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          isVisible={modalVisible}
          onModalShow={() => setShowContent(true)}
          onModalHide={() => setShowContent(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
          propagateSwipe={true}
          animationInTiming={100}
          animationOutTiming={200}
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            <View style={styles.dragIndicator} />
            {showContent && (
              <Calendar
                onApply={({ startDate, endDate }) =>
                  handleApplyDate(
                    startDate && endDate ? [startDate, endDate] : null
                  )
                }
              />
            )}
          </View>
        </Modal>

        <Pressable
          style={[styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>{displayedDate}</Text>
          <Ionicons
            name="calendar-outline"
            size={moderateScale(20)}
            color="#374957"
          />
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginHorizontal: scale(3),
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
  buttonOpen: {
    marginTop: scale(20),
    gap: scale(10),
    padding: scale(10),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#C0C3DC",
    borderRadius: scale(10),
    backgroundColor: "#F5F5F5",
  },
  textStyle: {
    color: "black",
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
});

export default InputCalendar;
