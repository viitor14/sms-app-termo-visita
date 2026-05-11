import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { gerarTermoPDF } from "../../utils/pdfGenerator";
// Importe seus styled components de Container, Titulo, etc.

export default function VisualizarChamado() {
  const params = useLocalSearchParams();
  console.log("Parâmetros recebidos na tela de VisualizarChamado:", params);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#d8d8d8" }}
      // contentContainerStyle é o ideal para dar padding dentro do ScrollView
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Stack.Screen options={{ title: "Detalhes do Chamado" }} />

      <Text style={{ fontSize: 14, color: "#666" }}>ID: {params.id}</Text>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10 }}>
        {params.unidade}
      </Text>

      <View
        style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Horários:</Text>
        <Text>Chegada: {params.chegada}</Text>
        <Text>Saída: {params.saida}</Text>
        <Text>Data da visita: {params.data}</Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 20,
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Motivo da visita:
        </Text>
        <Text>{params.motivos}</Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 10,
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Serviço realizado:
        </Text>
        <Text>{params.servico}</Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 10,
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Equipamento / Nº de serie:
        </Text>
        <Text>
          {params.equipamento}
          {params.numeroSerial && ` / ${params.numeroSerial}`}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Observações do Técnico:
        </Text>
        <Text style={{ fontSize: 16, fontStyle: "italic", color: "#444" }}>
          {params.observacao || "Nenhuma observação registrada."}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Situação Final:
        </Text>
        <Text style={{ fontSize: 16, fontStyle: "italic", color: "#444" }}>
          {params.situacao || "Nenhuma situação registrada."}
        </Text>
      </View>

      {/* ÁREA DE ASSINATURAS */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Assinatura do técnico:</Text>
          {params.imgAssinaturaTecnico && (
            <Image
              source={{ uri: params.imgAssinaturaTecnico }}
              style={{
                width: 200,
                height: 100,
                marginTop: 10,
                resizeMode: "contain",
              }}
            />
          )}
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#eee",
            paddingTop: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Nome e matrícula do técnico:
          </Text>
          <Text style={{ textAlign: "center", marginTop: 5 }}>
            {params.nomeTecnico} - {params.matriculaTecnico}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Assinatura do técnico:</Text>
          {params.imgAssinaturaTecnico && (
            <Image
              source={{ uri: params.imgAssinaturaTecnico }}
              style={{
                width: 200,
                height: 100,
                marginTop: 10,
                resizeMode: "contain",
              }}
            />
          )}
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#eee",
            paddingTop: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Nome e cargo do responsável:
          </Text>
          <Text style={{ textAlign: "center", marginTop: 5 }}>
            {params.nomeResponsavel} - {params.cargoResponsavel}
          </Text>
        </View>
      </View>

      {/* Futuramente, aqui podemos colocar um botão "Re-gerar PDF" */}
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={() => {
          const dadosParaPDF = {
            ...params,
            motivos: [params.motivos],
            situacao: [params.situacao],
          };

          gerarTermoPDF(dadosParaPDF);
        }}
      >
        <Text>Baixar PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
