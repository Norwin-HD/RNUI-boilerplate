import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import KovaraIcon from '../../assets/svg/kovara/kovaraIcon';

export function useKeepSplashOnReady(ready: boolean) {
  useEffect(() => {
    if (ready) {
    }
  }, [ready]);
}

interface CustomSplashProps {
  onFinish: () => void;
}

export function CustomSplash({ onFinish }: CustomSplashProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2500); 

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        <KovaraIcon
          width={scale(150)}
          height={verticalScale(150)}
          color="#FFFFFF"
        />
                <Text style={styles.appName}>Kovara</Text>
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loader}
        />
      </Animated.View>
    </Animated.View>
  );
}

export default function AppEntryExample() {
  const [isReady, setIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulamos la carga sin interferir con el splash nativo
        await new Promise((r) => setTimeout(r, 1200));
      } catch {
        console.warn('Error preparando la app');
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const handleSplashFinish = () => {
    setShowCustomSplash(false);
    // No necesitamos ocultar el splash nativo ya que no lo estamos usando
  };

  if (!isReady || showCustomSplash) {
    return <CustomSplash onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <Text>App cargada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3476F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  logo: {
    width: scale(150),
    height: verticalScale(150),
    marginBottom: verticalScale(15),
  },
  appName: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: verticalScale(8),
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
  loader: {
    marginTop: verticalScale(10),
  },
});