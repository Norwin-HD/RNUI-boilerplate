import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabRangeTime = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs = ["Hoy", "Última semana", "Este mes"];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rango de fechas</Text>
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.button,
                isActive ? styles.buttonActive : styles.buttonInactive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.text,
                  isActive ? styles.textActive : styles.textInactive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabRangeTime;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    gap: verticalScale(20),
  },
  header: {
    color: "#454A53",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_500Medium",
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  button: {
    borderRadius: 9999,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#3476F4",
  },
  buttonInactive: {
    backgroundColor: "#E1EBFD",
    borderColor: "#9FBFFA",
    borderWidth: 1,
  },
  text: {
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_500Medium",
  },
  textActive: {
    color: "#FFFFFF",
  },
  textInactive: {
    color: "#3476F4",
  },
});
