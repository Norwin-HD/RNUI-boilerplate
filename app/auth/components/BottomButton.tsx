import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText";


interface BottomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}

const BottomButton: React.FC<BottomButtonProps> = ({ onPress, text }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Ionicons
              name="arrow-forward"
              size={scale(18)}
              color="#FFFFFF"
              style={{ marginRight: scale(8) }}
            />
            <AppText variant="medium" style={styles.buttonText}>
              {text}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  container: {
    width: "100%",
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(30),
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#3476F4",
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2B79FF",
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.25,
    shadowRadius: scale(4),
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
  },
});
