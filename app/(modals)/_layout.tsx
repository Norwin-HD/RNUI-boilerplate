import { Stack } from "expo-router";
import React from "react";

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "fullScreenModal" }}>
      <Stack.Screen name="add-goals/index" options={{ headerShown: false }} />
    </Stack>
  );
}
