import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import ClockIcon from "./BottomBarSvg/ClockIcon";
import HomeIcon from "./BottomBarSvg/HomeIcon";
import PlusIcon from "./BottomBarSvg/PlusIcon";
import SearchIcon from "./BottomBarSvg/SearchIcon";
import UserIcon from "./BottomBarSvg/UserIcon";

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
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuOption = (option: string) => {
    setIsMenuVisible(false);
    if (option === "Nueva meta") {
      router.push("/add-goals" as any);
      return;
    }
    // Otros flujos a futuro
    console.log(`Seleccionado: ${option}`);
  };

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
    <>
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
                    onPress={toggleMenu}
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

      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={toggleMenu}
          />
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Agregar</Text>
            <TouchableOpacity
              style={styles.menuItemOption}
              onPress={() => handleMenuOption("Nueva meta")}
            >
              <Text style={styles.menuText}>Nueva meta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemOption}
              onPress={() => handleMenuOption("Agregar presupuesto")}
            >
              <Text style={styles.menuText}>Nuevo presupuesto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemOption}
              onPress={() => handleMenuOption("Agregar gasto")}
            >
              <Text style={styles.menuText}>Nuevo gasto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemOption}
              onPress={() => handleMenuOption("Agregar ingresos")}
            >
              <Text style={styles.menuText}>Nuevo ingreso</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
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
    height: verticalScale(70),
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
    paddingBottom: verticalScale(18),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: "transparent",
  },
  label: {
    marginTop: scale(4),
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 15,
    fontFamily: "Poppins",
  },
  fab: {
    width: scale(70),
    marginTop: -verticalScale(30),
    height: verticalScale(60),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: scale(14),
    borderWidth: 4,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    padding: scale(15),
    paddingBottom: verticalScale(30),
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderTopWidth: 2,
    borderTopColor: FIGMA.primary,
  },
  menuItemOption: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: FIGMA.indicator,
  },
  menuText: {
    fontSize: 15,
    color: "#000",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  menuTitle: {
    fontSize: 16,
    color: FIGMA.primary,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    marginBottom: verticalScale(5),
  },
});
