import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import FigmaBottomNav from "@/components/ui/bottomNav/figma-bottom-nav";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";

// Adapter to convert react-navigation bottom tab props to our BottomNav items
function FigmaNavAdapter(props: any) {
  const { state, navigation } = props;

  const handleSelect = (index: number) => {
    const route = state.routes[index];
    if (!route) return;

    const isFocused = state.index === index;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // usar navigation.navigate para delegar la resolución de rutas al navigator
      navigation.navigate(route.name);
    }
  };

  return <FigmaBottomNav selectedIndex={state.index} onSelect={handleSelect} />;
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
        name="transacciones/index"
        options={{
          title: "Transacciones",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="metas/index"
        options={{
          title: "Metas",
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
