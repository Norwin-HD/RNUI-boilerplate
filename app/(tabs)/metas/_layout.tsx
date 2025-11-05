import { Stack } from "expo-router";
import React from "react";

export default function MetasStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screen" />
    </Stack>
  );
}
