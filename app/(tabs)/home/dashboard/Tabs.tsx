import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs = ["Todas", "Transacciones", "Metas", ];

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: scale(2),
    marginBottom: verticalScale(20),
  },
  buttonMain: {
    backgroundColor: "#3476F4",
    borderRadius: 9999,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(12),
    marginRight: scale(10),
  },
  textMain: {
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_500Medium",
  },
  buttonSecond: {
    backgroundColor: "#E1EBFD",
    borderColor: "#9FBFFA",
    borderRadius: 9999,
    borderWidth: 1,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(12),
    marginRight: scale(10),
  },
  textSecond: {
    color: "#3476F4",
    fontSize: moderateScale(15),
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Tabs;
