import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface TabsProps {
  activeTab: Date | string;
  setActiveTab: (tab: string) => void;
  onFilterPress: () => void;
}

const TabRangeTime: React.FC<TabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = ["Hoy", "Ultima semana", "Este mes"];

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{"Rango de fechas"}</Text>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={activeTab === tab ? styles.buttonMain : styles.buttonSecond}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={activeTab === tab ? styles.textMain : styles.textSecond}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    height: verticalScale(48),
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "stretch",
    gap: verticalScale(20),
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  buttonMain: {
    backgroundColor: "#3476F4",
    borderRadius: 9999,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    color: "#454A53",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_500Medium",
  },

  textMain: {
    color: "#FFFFFF",
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_500Medium",
  },
  buttonSecond: {
    backgroundColor: "#E1EBFD",
    borderColor: "#9FBFFA",
    borderRadius: 9999,
    borderWidth: 1,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  textSecond: {
    color: "#3476F4",
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_500Medium",
  },
});

export default  TabRangeTime;
