import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Hook helper: mantiene el splash nativo visible hasta que "ready" sea true.
export function useKeepSplashOnReady(ready: boolean) {
  useEffect(() => {
    // Evita que el splash se oculte automáticamente al iniciar la app.
    SplashScreen.preventAutoHideAsync().catch(() => {
      // ignore
    });
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {
        // ignore
      });
    }
  }, [ready]);
}

export default function AppEntryExample() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Simular carga de assets / fuentes / datos (reemplazar por cargas reales).
        await new Promise((r) => setTimeout(r, 1200));
      } catch {
        console.warn('Error preparando la app');
      } finally {
        setIsReady(true);
        try {
          await SplashScreen.hideAsync();
        } catch {
          // ignore
        }
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    // Retornar null mantiene el splash nativo visible hasta que lo ocultemos
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>App cargada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});