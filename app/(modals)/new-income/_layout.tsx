import { CategoryProvider } from "@/src/stores/categories/CategoryContext";
import { Stack } from "expo-router";
import React from "react";

export default function AddIncomeLayout() {
  return (
    <CategoryProvider singleSelect={true}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="categorie-filter" />
      </Stack>
    </CategoryProvider>
  );
}
