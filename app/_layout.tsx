import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular
} from '@expo-google-fonts/montserrat';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './global.css';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useFonts } from 'expo-font';

// Load Poppins from Google Fonts repository (raw github URLs). These are remote URIs and
// will be downloaded on first run. If you prefer bundling the font, add files to assets/fonts
// and change the require() calls below.
const FONT_MAP = {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_400Regular
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts(FONT_MAP as any);

  // Wait for fonts to load to ensure Poppins is available for labels.
  // Returning null briefly prevents layout shift; change to a Spinner if you prefer.
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
