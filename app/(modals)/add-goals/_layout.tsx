import { CategoryProvider } from "@/src/features/add-goals/contexts/CategoryContext";
import { Stack } from "expo-router";
import React from "react";

export default function AddGoalLayout() {
  return (
    <CategoryProvider singleSelect={true}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="categorie-filter" />
      </Stack>
    </CategoryProvider>
  );
}
