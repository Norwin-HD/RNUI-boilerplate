import { Stack } from "expo-router";
import React from "react";

export default function TransaccionesStack() {
  return (
    <Stack initialRouteName="screens/index">
      <Stack.Screen
        name="screens/filterScreen/filterScreen"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="screens/filterScreen/categorieFilterScreen"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen name="screens/index" options={{ headerShown: false }} />
    </Stack>
  );
}
