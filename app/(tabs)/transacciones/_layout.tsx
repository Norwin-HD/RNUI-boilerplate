import { Stack } from "expo-router";
import React from "react";

export default function TransaccionesStack() {
  return (
    <Stack>
      <Stack.Screen name="screens/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/filterScreen"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="screens/categorieFilterScreen"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
