import { Stack } from "expo-router";
import React from "react";

export default function MetasStack() {
  return (
    <Stack>
      <Stack.Screen name="screen/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screen/index"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
