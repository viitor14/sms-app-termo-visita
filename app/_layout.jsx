import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* A tela 'index' é o seu formulário */}
      <Stack.Screen
        name="index"
        options={{
          title: "Termo de Visita",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
        }}
      />
      {/* A tela 'assinatura' será o próximo passo */}
      <Stack.Screen
        name="assinatura"
        options={{ title: "Assinatura do Cliente" }}
      />
    </Stack>
  );
}
