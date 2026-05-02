import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontesCarregadas] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });
  useEffect(() => {
    if (fontesCarregadas) {
      SplashScreen.hideAsync();
    }
  }, [fontesCarregadas]);

  if (!fontesCarregadas) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* A tela 'index' é o seu formulário */}
      <Stack.Screen
        name="chamado"
        options={{
          title: "Termo de Visita",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
        }}
      />

      {/* A tela de assinatura que você já tem */}
      <Stack.Screen name="assinatura" options={{ title: "Assinatura" }} />
    </Stack>
  );
}
