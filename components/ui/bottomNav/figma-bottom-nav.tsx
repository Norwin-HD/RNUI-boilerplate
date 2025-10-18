import { useColorScheme } from "@/src/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import ClockIcon from "./BottomBarImg/ClockIcon";
import HomeIcon from "./BottomBarImg/HomeIcon";
import PlusIcon from "./BottomBarImg/PlusIcon";
import SearchIcon from "./BottomBarImg/SearchIcon";
import UserIcon from "./BottomBarImg/UserIcon";

const FIGMA = {
  primary: "#1662f3",
  inactive: "#484c52",
  fab: "#1fc16b",
  fabBorder: "#ffffff",
  bg: "#ffffff",
  indicator: "#b9c0c9",
};

type Props = {
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  variant?: "default" | "center-fab" | "compact";
};

export default function FigmaBottomNav({
  selectedIndex = 0,
  onSelect,
  variant = "center-fab",
}: Props) {
  useColorScheme();

  const items = [
    {
      key: "(home)",
      label: "Inicio",
      icon: HomeIcon,
    },
    {
      key: "(transacciones)",
      label: "Transacciones",
      icon: SearchIcon,
    },
    { key: "(agregar)", label: "Agregar", icon: PlusIcon },
    {
      key: "(metas)",
      label: "Metas",
      icon: ClockIcon,
    },
    {
      key: "(reportes)",
      label: "Reportes",
      icon: UserIcon,
    },
  ];

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.wrapper, { backgroundColor: FIGMA.bg }]}
    >
      {/* menu list */}
      <View style={[styles.menuList, { backgroundColor: "transparent" }]}>
        {items.map((it, idx) => {
          const Icon = it.icon;
          // center fab
          if (idx === 2 && variant === "center-fab") {
            return (
              <View key={it.key} style={styles.menuCenterContainer}>
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => onSelect?.(idx)}
                  style={[
                    styles.fab,
                    {
                      backgroundColor: FIGMA.fab,
                      borderColor: FIGMA.fabBorder,
                    },
                  ]}
                >
                  <Icon width={24} height={24} color={FIGMA.fabBorder} />
                </TouchableOpacity>
              </View>
            );
          }

          const sel = idx === selectedIndex;
          const color = sel ? FIGMA.primary : FIGMA.inactive;

          return (
            <TouchableOpacity
              key={it.key}
              style={styles.menuItem}
              onPress={() => onSelect?.(idx)}
            >
              <Icon width={24} height={24} color={color} />
              {it.label ? (
                <Text style={[styles.label, { color }]}>{it.label}</Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuList: {
    height: verticalScale(56),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: scale(8),
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  menuCenterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 18,
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 15,
    fontFamily: "Poppins",
  },
  fab: {
    width: scale(70),
    height: verticalScale(60),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: scale(14),
    borderWidth: 4,
  },
});
