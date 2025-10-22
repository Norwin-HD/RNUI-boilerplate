import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
//agregue esta dependencia por el swipper del modal
import Modal from "react-native-modal";
import Calendar from "./calendar/Calendar";
import { scale } from "react-native-size-matters";

const InputCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          isVisible={modalVisible}
          onModalShow={() => setModalVisible(true)}
          onModalHide={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
          propagateSwipe={true}
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            <View style={styles.dragIndicator} />
            <Calendar />
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Mostrar calendario</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  button: {
    borderRadius: scale(20),
    padding: scale(10),
    marginTop: scale(10),
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default InputCalendar;
