import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import FilterList from "../svgTransactions/filter-list";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFilterPress: () => void;
}

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  setActiveTab,
  onFilterPress,
}) => {
  const tabs = ["Todas", "Ingresos", "Gastos"];

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={onFilterPress} style={styles.buttonSecond}>
          <FilterList width={20} height={20} color="#3476F4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(48),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: verticalScale(20),
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

export default Tabs;
