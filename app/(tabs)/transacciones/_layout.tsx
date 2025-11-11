import { Stack } from "expo-router";
import React from "react";

// The global providers (CategoryProvider, FilterProvider, RangeProvider, TransactionsProvider)
// are declared at the app root (`app/_layout.tsx`). Do not re-create them here to avoid
// having multiple context instances that don't share state. This layout only needs to
// expose the transacciones stack screens.
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
      <Stack.Screen name="detail/index" options={{ headerShown: false }} />
    </Stack>
  );
}
