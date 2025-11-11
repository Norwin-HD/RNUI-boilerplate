import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + moderateScale(8) }]}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel="Eliminar meta"
      >
        <Ionicons name="trash" size={moderateScale(25)} color="#FB283A" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={onEdit}
        accessibilityRole="button"
        accessibilityLabel="Editar meta"
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
    backgroundColor: "#ffffff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  deleteButton: {
    borderRadius: moderateScale(12),
    padding: moderateScale(8),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(48),
    height: moderateScale(48),
  },
  editButton: {
    flex: 1,
    marginLeft: moderateScale(16),
    backgroundColor: "#016EED",
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(48),
    minWidth: moderateScale(120),
  },
  editText: {
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
});

export default ActionButtons;