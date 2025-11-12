import { CategoryProvider } from "@/src/shared/CategoryContext";
import { Stack } from "expo-router";
import React from "react";

export default function ModalsLayout() {
  return (
    <CategoryProvider singleSelect={true}>
      <Stack screenOptions={{ headerShown: false, presentation: "fullScreenModal" }}>
        <Stack.Screen name="add-goals/index" options={{ headerShown: false }} />
        <Stack.Screen name="add-goals/categorie-filter" options={{ headerShown: false }} />

        <Stack.Screen name="add-budget/index" options={{ headerShown: false }} />
        <Stack.Screen name="add-budget/categories-filter" options={{ headerShown: false }} />

        <Stack.Screen name="new-income/index" options={{ headerShown: false }} />
        <Stack.Screen name="new-income/categories-filter" options={{ headerShown: false }} />

        <Stack.Screen name="new-expense/index" options={{ headerShown: false }} />
        <Stack.Screen name="new-expense/categories-filter" options={{ headerShown: false }} />


      </Stack>
    </CategoryProvider>
  );
}
