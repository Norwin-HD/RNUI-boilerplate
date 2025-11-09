import { FilterProvider } from "@/src/features/transacciones/contexts/context-filter-transaction/FilterContext";
import { RangeProvider } from "@/src/features/transacciones/contexts/context-range/RangeContext";
import { CategoryProvider } from "@/src/features/transacciones/contexts/contexts-category/CategoryContext";
import { Stack } from "expo-router";
import React from "react";

export default function TransaccionesStack() {
  return (
    <FilterProvider>
      <CategoryProvider>
        <RangeProvider>
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
        </RangeProvider>
      </CategoryProvider>
    </FilterProvider>
  );
}
