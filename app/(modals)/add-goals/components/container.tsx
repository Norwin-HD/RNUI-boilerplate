import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CategoriaCard from "./Categories";
import FieldComponent from "./fieldComponente";
import InputCalendar from "./inputCalendary";

export default function AddGoalContainer() {
  const [dates, setDates] = useState<[Date, Date] | null>(null);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FieldComponent />
        <InputCalendar dates={dates} setDates={setDates} />
        <CategoriaCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minHeight: "100%",
  },
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    gap: verticalScale(8),
    flexGrow: 1,
  },
});
