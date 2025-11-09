import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

interface CalendarProps {
  onApply?: (r: { startDate?: Date; endDate?: Date }) => void;
}

export function Calendar({ onApply }: CalendarProps) {
  const defaultStyles = useDefaultStyles();
  type RangeDate = { startDate?: DateType; endDate?: DateType };
  const [selected, setSelected] = useState<RangeDate | undefined>();

  const COLORS = {
    primary: "#016EED",
    primaryWeak: "#DDECFD",
    primaryBorder: "#80b7f6",
    textPrimary: "#020202",
    textSecondary: "#6A6A6D",
    background: "#ffffff",
  };

  const stylesOverride = {
    days: {
      ...(defaultStyles.days as object),
    },
    day_cell: {
      ...(defaultStyles.day_cell as object),
      width: moderateScale(44),
      height: moderateScale(44),
    },
    day: {
      ...(defaultStyles.day as object),
      color: COLORS.textPrimary,
    },
    day_label: {
      ...(defaultStyles.day_label as object),
      color: COLORS.textSecondary,
      fontSize: moderateScale(14),
      fontFamily: "Montserrat_500Medium",
      lineHeight: moderateScale(30),
    },

    weekday_label: {
      ...(defaultStyles.weekday_label as object),
      fontFamily: "Montserrat_600SemiBold",
      fontSize: moderateScale(12),
      color: COLORS.textPrimary,
      lineHeight: moderateScale(30),
    },
    selected_label: {
      ...(defaultStyles.selected_label as object),
      color: "#ffffff",
    },
    range_fill: {
      ...(defaultStyles.range_fill as object),
      backgroundColor: COLORS.primaryWeak,
      marginVertical: moderateScale(5),
    },
    month_selector_label: {
      ...(defaultStyles.month_selector_label as object),
      fontSize: moderateScale(16),
      color: COLORS.textPrimary,
      fontFamily: "Montserrat_600SemiBold",
    },
    year_selector_label: {
      ...(defaultStyles.year_selector_label as object),
      fontSize: moderateScale(16),
      color: COLORS.textPrimary,
      fontFamily: "Montserrat_600SemiBold",
    },
    month: {
      ...(defaultStyles.month as object),
      backgroundColor: COLORS.primaryWeak,
      marginVertical: moderateScale(5),
    },
    month_label: {
      ...(defaultStyles.month_label as object),
      fontSize: moderateScale(13),
      fontFamily: "Montserrat_600SemiBold",
      color: COLORS.textPrimary,
    },
    year: {
      ...(defaultStyles.year as object),
      backgroundColor: COLORS.primaryWeak,
      marginVertical: moderateScale(5),
    },
    header: {
      ...(defaultStyles.header as object),
      fontSize: moderateScale(16),
      color: COLORS.textPrimary,
      fontFamily: "Montserrat_600SemiBold",
    },
    year_label: {
      ...(defaultStyles.year_label as object),
      color: COLORS.textPrimary,
      fontSize: moderateScale(13),
      fontFamily: "Montserrat_600SemiBold",
    },
    button_prev_image: {
      ...(defaultStyles.button_prev_image as object),
      backgroundColor: "transparent",
      tintColor: "#000000",
      width: moderateScale(20),
      height: moderateScale(20),
    },
    button_next_image: {
      ...(defaultStyles.button_next_image as object),
      backgroundColor: "transparent",
      tintColor: "#000000",
      width: moderateScale(20),
      height: moderateScale(20),
    },
    selected: {
      ...(defaultStyles.selected as object),
      backgroundColor: COLORS.primary,
      color: "#ffffff",
      width: moderateScale(39),
      height: moderateScale(7),
      borderRadius: moderateScale(9999),
    },
  } as any;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Seleccionar fecha</Text>
        <TouchableOpacity
          style={styles.applyRow}
          onPress={() => {
            const start = selected?.startDate
              ? new Date(selected.startDate as any)
              : undefined;
            const end = selected?.endDate
              ? new Date(selected.endDate as any)
              : undefined;
            onApply?.({ startDate: start, endDate: end });
          }}
        >
          <Ionicons name="checkmark" size={25} color={COLORS.textPrimary} />
          <Text style={styles.applyText}>aplicar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerWrap}>
        <DateTimePicker
          monthsFormat="full"
          weekdaysFormat="short"
          mode="range"
          startDate={selected?.startDate}
          endDate={selected?.endDate}
          onChange={({ startDate, endDate }) =>
            setSelected({ startDate, endDate })
          }
          styles={stylesOverride}
        />
      </View>

      <View style={styles.quickButtonsRow}>
        <TouchableOpacity
          style={styles.quickButtonLight}
          onPress={() =>
            setSelected({ startDate: new Date(), endDate: new Date() })
          }
        >
          <Text style={styles.quickButtonLightText}>Hoy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingRight: moderateScale(4),
    paddingBottom: moderateScale(0),
    paddingLeft: moderateScale(4),
    borderRadius: moderateScale(24),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(6),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(4),
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontFamily: "Montserrat_600SemiBold",
    color: "#020202",
    paddingLeft: moderateScale(4),
  },
  applyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(8),
  },
  applyText: {
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_500Medium",
    color: "#020202",
  },
  pickerWrap: {
    paddingHorizontal: moderateScale(2),
    paddingBottom: moderateScale(2),
  },
  quickButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: moderateScale(16),
    marginTop: moderateScale(16),
  },
  quickButtonLight: {
    backgroundColor: "#DDECFD",
    borderWidth: 1,
    borderColor: "#9fbffa",
    paddingHorizontal: moderateScale(120),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  quickButtonLightText: {
    color: "#016EED",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Calendar;
