import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import BootSplash from 'react-native-bootsplash'
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useExpensesStore } from '@/store/expensesStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const hasHydrated = useExpensesStore(state => state._hasHydrated)
  BootSplash.isVisible().then((value) => console.log(value));
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
      const init = async () => {
        // …do multiple sync or async tasks
      };

      init().finally(async () => {
        await BootSplash.hide({ fade: true });
        // console.log("BootSplash has been hidden successfully");
      });
    }
  }, [loaded, hasHydrated]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}