import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import FigmaBottomNav from "@/components/ui/bottomNav/figma-bottom-nav";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { CategoryProvider } from "./transacciones/contexts/contexts-category/dataContext";

// Adapter to convert react-navigation bottom tab props to our BottomNav items
function FigmaNavAdapter(props: any) {
  const { state, navigation } = props;

  // Get the route object for the currently active tab
  const route = state.routes[state.index];

  // Get the name of the screen that is focused inside the current tab's navigator
  const routeName = getFocusedRouteNameFromRoute(route);

  // Oculta la tab bar cuando el foco está en la pantalla de filtro
  if (
    routeName === "filterScreen" ||
    routeName === "screens/filterScreen" ||
    routeName === "screens/categorieFilterScreen"
  ) {
    return null;
  }

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
    <CategoryProvider>
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
    </CategoryProvider>
  );
}
