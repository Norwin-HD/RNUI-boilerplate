import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { Alert } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import FigmaBottomNav from "@/components/ui/bottomNav/figma-bottom-nav";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/constants/use-color-scheme";
import { useHasActiveFilters } from "@/src/hooks/category/use-has-active-filters";

import { useCategoryContext } from "@/src/stores/categories/CategoryContext";
import { useFilter } from "@/src/stores/categories/FilterContext";
import { useRangeContext } from "@/src/stores/transactions/RangeContext";

function FigmaNavAdapter(props: any) {
  const { state, navigation } = props;

  const route = state.routes[state.index];

  const routeName = getFocusedRouteNameFromRoute(route);

  const name = routeName ?? "";
  const hasActiveFilters = useHasActiveFilters();
  const { clearFilters: clearMainFilters } = useFilter();
  const { clearRange } = useRangeContext();
  const { clear: clearCategories } = useCategoryContext();

  if (/filter/i.test(name)) {
    return null;
  }

  const handleClearAllFilters = () => {
    clearMainFilters();
    clearRange();
    clearCategories();
  };

  const handleSelect = (index: number) => {
    const routeIndex = index > 2 ? index - 1 : index;
    const route = state.routes[routeIndex];
    if (!route) return;

    const isFocused = state.index === routeIndex;

    if (route.name === "transacciones" && hasActiveFilters) {
      Alert.alert(
        "Filtros Activos",
        "Tienes filtros aplicados en Transacciones. ¿Quieres limpiarlos antes de continuar?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Limpiar Filtros",
            onPress: () => {
              handleClearAllFilters();
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            },
          },
        ],
        { cancelable: false }
      );
      return; // Prevent navigation if filters are active and user cancels or clears
    }

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const bottomNavIndex = state.index < 2 ? state.index : state.index + 1;

  return (
    <FigmaBottomNav selectedIndex={bottomNavIndex} onSelect={handleSelect} />
  );
}

function FigmaNavAdapterWithProviders(props: any) {
  return (
    <FigmaNavAdapter {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props: any) => <FigmaNavAdapterWithProviders {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transacciones"
          options={{
            title: "Transacciones",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="metas"
          options={{
            title: "Metas",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="star.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="chart.bar.fill" color={color} />
            ),
          }}
        />
      </Tabs>
  );
}
