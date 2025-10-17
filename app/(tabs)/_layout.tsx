import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import FigmaBottomNav from '@/components/ui/figma-bottom-nav';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Adapter to convert react-navigation bottom tab props to our BottomNav items
function FigmaNavAdapter(props: any) {
  const { state, navigation } = props;

  const routeNames = state.routes.map((r: any) => r.name);

  const findRoute = (preferred: string) => (routeNames.includes(preferred) ? preferred : 'index');

  const items = [
    {
      key: 'inicio',
      label: 'Inicio',
      onPress: () => navigation.navigate(findRoute('index')),
    },
    {
      key: 'transacciones',
      label: 'Transacciones',
      onPress: () => navigation.navigate(findRoute('explore')),
    },
    {
      key: 'metas',
      label: 'Metas',
      onPress: () => navigation.navigate(findRoute('metas')),
    },
    {
      key: 'reportes',
      label: 'Reportes',
      onPress: () => navigation.navigate(findRoute('reportes')),
    },
  ];

  return <FigmaBottomNav selectedIndex={state.index} onSelect={(i) => items[i]?.onPress?.()} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props: any) => <FigmaNavAdapter {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
