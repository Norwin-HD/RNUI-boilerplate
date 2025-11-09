import { Stack } from "expo-router";
import React from "react";
import { CategoryProvider } from "../../../src/features/transacciones/contexts/contexts-category/CategoryContext";

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
