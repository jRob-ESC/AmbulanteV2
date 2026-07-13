import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { lightTheme } from "../src/shared/lib/theme/theme";

const queryClient = new QueryClient();
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={lightTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}