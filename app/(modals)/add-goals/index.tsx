
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useState } from "react";

import Header from "./components/Header";
import AddGoalContainer from "./components/container";
import InputCalendar from "./components/inputCalendary";

export default function AddGoalModal() {
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("Nueva meta:");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#3476F4"
        barStyle="light-content"
        translucent={false}
      />
      <Header />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <AddGoalContainer />
        <InputCalendar  />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3476F4",
  },
  content: {
    paddingHorizontal: moderateScale(1),
  },
});
