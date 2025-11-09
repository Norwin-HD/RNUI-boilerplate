import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import FigmaBottomNav from "@/components/ui/bottomNav/figma-bottom-nav";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";

function FigmaNavAdapter(props: any) {
  const { state, navigation } = props;

  const route = state.routes[state.index];

  const routeName = getFocusedRouteNameFromRoute(route);

  const name = routeName ?? "";
  if (/filter/i.test(name)) {
    return null;
  }

  const handleSelect = (index: number) => {
    const routeIndex = index > 2 ? index - 1 : index;
    const route = state.routes[routeIndex];
    if (!route) return;

    const isFocused = state.index === routeIndex;

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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props: any) => <FigmaNavAdapter {...props} />}
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
        name="reportes/index"
        options={{
          title: "Reportes",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chart.bar.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
