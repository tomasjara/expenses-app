import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useExpensesStore } from '@/store/expensesStore';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasHydrated = useExpensesStore(state => state._hasHydrated)

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded && hasHydrated) {
       setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, [loaded, hasHydrated]);

  if (!loaded || !hasHydrated) {
    return null;
  }

  return (
    <>
      <StatusBar
        translucent={false}
        barStyle={'light-content'}
        backgroundColor={'#000'}
      />
      <Stack screenOptions={{ contentStyle: { backgroundColor: 'red' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}