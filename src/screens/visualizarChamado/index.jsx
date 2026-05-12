import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { gerarTermoPDF } from "../../utils/pdfGenerator";

import { neutralColors } from "../../utils/colors";

import {
  Container,
  ContainerScroll,
  DivData,
  DivDataEHorario,
  DivNomeDaUnidade,
  DivVisitaId,
  TextoUnidade,
  TituloDiv,
} from "./styled";

export default function VisualizarChamado() {
  const params = useLocalSearchParams();

  return (
    <ContainerScroll>
      <Stack.Screen options={{ title: "Detalhes da Visita" }} />

      <Container>
        <DivVisitaId>
          <TituloDiv>VISITA ID</TituloDiv>
          <TituloDiv
            style={{
              color: "#000",
            }}
          >
            {params.id}
          </TituloDiv>
        </DivVisitaId>
        <DivNomeDaUnidade>
          <TituloDiv>UNIDADE</TituloDiv>
          <TextoUnidade>{params.unidade}</TextoUnidade>
        </DivNomeDaUnidade>
      </Container>

      <Container>
        <DivDataEHorario>
          <DivData>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: neutralColors.neutral,
              }}
            >
              Data
            </Text>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>
              {params.data}
            </Text>
          </DivData>
          <DivData>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: neutralColors.neutral,
              }}
            >
              HORÁRIOS{" "}
            </Text>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>
              {params.chegada} - {params.saida}
            </Text>
          </DivData>
        </DivDataEHorario>

        <Text>{params.motivos}</Text>
        <Text>{params.servico}</Text>
      </Container>

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
    </ContainerScroll>
  );
}
