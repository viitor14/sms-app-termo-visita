import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
// Importe seus styled components de Container, Titulo, etc.

export default function VisualizarChamado() {
  const params = useLocalSearchParams();
  console.log("Parâmetros recebidos na tela de VisualizarChamado:", params);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Stack.Screen options={{ title: "Detalhes do Chamado" }} />

      <Text style={{ fontSize: 14, color: "#666" }}>ID: {params.id}</Text>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10 }}>
        {params.unidade}
      </Text>

      <View
        style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ fontWeight: "bold" }}>Horários:</Text>
        <Text>Chegada: {params.chegada}</Text>
        <Text>Saída: {params.saida}</Text>
      </View>

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>
        Observações do Técnico:
      </Text>
      <ScrollView
        style={{
          marginTop: 10,
          padding: 10,
          borderLeftWidth: 3,
          borderLeftColor: "#2ecc71",
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 24, fontStyle: "italic" }}>
          {params.observacao || "Nenhuma observação registrada."}
        </Text>
      </ScrollView>

      {/* Futuramente, aqui podemos colocar um botão "Re-gerar PDF" */}
    </View>
  );
}
