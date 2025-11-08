import { Stack } from "expo-router";
import React from "react";
import { CategoryProvider } from "./add-goals/contexts/dataContext";

export default function ModalsLayout() {
  return (
    <CategoryProvider>
      <Stack screenOptions={{ headerShown: false, presentation: "fullScreenModal" }}>
        <Stack.Screen name="add-goals/index" options={{ headerShown: false }} />
        <Stack.Screen name="add-goals/categorie-filter" options={{ headerShown: false }} />
      </Stack>
    </CategoryProvider>
  );
}
