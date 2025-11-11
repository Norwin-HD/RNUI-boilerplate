import { Stack } from "expo-router";
import React from "react";
import { CategoryProvider } from "@/src/stores/categories/CategoryContext";

export default function AddExpenseLayout() {
  return (
    <CategoryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="categorie-filter" />
      </Stack>
    </CategoryProvider>
  );
}
