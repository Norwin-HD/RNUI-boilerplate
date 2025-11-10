import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import FilterList from "../../svg/filter-list";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFilterPress: () => void;
  isLocked?: boolean;
}

const Tabs = ({ activeTab, onFilterPress, setActiveTab, isLocked = false }: TabsProps) => {
  
  const tabs = ["Todas", "Ingresos", "Gastos"];

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              activeTab === tab ? styles.buttonMain : styles.buttonSecond,
              isLocked && tab !== activeTab && styles.buttonDisabled
            ]}
            onPress={() => !isLocked && setActiveTab(tab)}
            disabled={isLocked && tab !== activeTab}
          >
            <Text
              style={[
                activeTab === tab ? styles.textMain : styles.textSecond,
                isLocked && tab !== activeTab && styles.textDisabled
              ]}
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
  buttonDisabled: {
    opacity: 0.5,
  },
  textDisabled: {
    opacity: 0.5,
  },
});

export default Tabs;
