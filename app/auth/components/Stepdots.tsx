import React from "react";
import { StyleSheet, View } from "react-native";

interface StepDotsProps {
  total: number;
  activeIndex: number; //empieza en 0
}


export default function StepDots({ total, activeIndex }: StepDotsProps) {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex
              ? { backgroundColor: "#3476F4", width: 20 }
              : { backgroundColor: "#E5E7EB" },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 10,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },
});
