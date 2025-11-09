import { GoalsProvider } from "@/src/features/add-goals/contexts";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useFonts } from "expo-font";
import { TransactionsProvider } from "../src/features/transacciones/contexts/transactions-context";

const FONT_MAP = {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts(FONT_MAP as any);

  if (!fontsLoaded) return null;

  return (
    <GoalsProvider>
      <TransactionsProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth/index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)"
              options={{ headerShown: false, presentation: "fullScreenModal" }}
            />
          </Stack>
          <StatusBar style="inverted" />
        </ThemeProvider>
      </TransactionsProvider>
    </GoalsProvider>
  );
}
