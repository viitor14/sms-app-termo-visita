import { EvilIcons, FontAwesome6 } from "@expo/vector-icons/";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { gerarTermoPDF } from "../../utils/pdfGenerator";

import { atualizarChamadoStorage } from "../../database/chamadoStorage";
import { neutralColors, primaryColors } from "../../utils/colors";
import { listaUnidades } from "../../utils/listaUnidades";

import {
  Assinatura,
  BotaoBaixarPDF,
  BotaoEditarUnidade,
  Container,
  ContainerScroll,
  DivAssinatura,
  DivData,
  DivDataEHorario,
  DivDataIcon,
  DivEquipamentoESerial,
  DivIconEquipamento,
  DivMotivoEServico,
  DivMotivoVisita,
  DivNomeDaUnidade,
  DivVisitaId,
  MainContainer,
  TextoSituacao,
  TextoUnidade,
  TituloDiv,
} from "./styled";

export default function VisualizarChamado() {
  const params = useLocalSearchParams();

  const [unidadeSelecionada, setUnidadeSelecionada] = useState(params.unidade);

  const [estaEditando, setEstaEditando] = useState(false);

  const handleEscolherUnidade = async (novaUnidade) => {
    try {
      await atualizarChamadoStorage(params.id, {
        unidade: novaUnidade,
      });
      setUnidadeSelecionada(novaUnidade);
      setEstaEditando(false);
    } catch (error) {
      console.error("Erro ao salvar a nova unidade:", error);
    }
  };

  return (
    <ContainerScroll>
      <Stack.Screen options={{ title: "Detalhes da Visita" }} />
      <MainContainer>
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
            {!estaEditando ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextoUnidade>{unidadeSelecionada}</TextoUnidade>

                <BotaoEditarUnidade onPress={() => setEstaEditando(true)}>
                  <EvilIcons name="pencil" size={24} color="#fff" />
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    Editar
                  </Text>
                </BotaoEditarUnidade>
              </View>
            ) : (
              /* Se ESTIVER editando, mostra a lista para toque direto na tela */
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 8,
                  padding: 5,
                }}
              >
                {listaUnidades.map((opcao, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleEscolherUnidade(opcao)}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      borderBottomWidth:
                        index === listaUnidades.length - 1 ? 0 : 1, // Tira a borda do último
                      borderBottomColor: "#eee",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        color: "#333",
                        fontSize: 16,
                      }}
                    >
                      {opcao}
                    </Text>
                  </TouchableOpacity>
                ))}

                {/* Botão para cancelar e fechar a lista sem mudar nada */}
                <TouchableOpacity
                  onPress={() => setEstaEditando(false)}
                  style={{ marginTop: 15, alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      color: "#e74c3c",
                    }}
                  >
                    Cancelar Edição
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </DivNomeDaUnidade>
        </Container>

        <Container>
          <DivDataEHorario>
            <DivData>
              <DivDataIcon>
                <FontAwesome6
                  name="calendar"
                  size={18}
                  color={neutralColors.neutral}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    color: neutralColors.neutral,
                    marginTop: 4,
                    fontSize: 14,
                  }}
                >
                  Data
                </Text>
              </DivDataIcon>
              <Text style={{ fontFamily: "Poppins_500Medium" }}>
                {params.data}
              </Text>
            </DivData>
            <DivData>
              <DivDataIcon>
                <FontAwesome6
                  name="clock"
                  size={18}
                  color={neutralColors.neutral}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    color: neutralColors.neutral,
                    marginTop: 4,
                  }}
                >
                  HORÁRIOS
                </Text>
              </DivDataIcon>
              <Text style={{ fontFamily: "Poppins_500Medium" }}>
                {params.chegada} - {params.saida}
              </Text>
            </DivData>
          </DivDataEHorario>
          <DivMotivoEServico>
            <TituloDiv>Motivo da Visita</TituloDiv>
            <DivMotivoVisita>
              <Text style={{ fontFamily: "Poppins_400Regular" }}>
                {params.motivos}
              </Text>
            </DivMotivoVisita>
          </DivMotivoEServico>
          <DivMotivoEServico>
            <TituloDiv>Serviço Realizado</TituloDiv>
            <DivMotivoVisita>
              <Text style={{ fontFamily: "Poppins_400Regular" }}>
                {params.servico}
              </Text>
            </DivMotivoVisita>
          </DivMotivoEServico>
        </Container>

        <Container style={{ flexDirection: "row", gap: 12 }}>
          <DivIconEquipamento>
            <View
              style={{
                padding: 12,
                borderRadius: 50,
                backgroundColor: primaryColors.p90,
              }}
            >
              <FontAwesome6
                name="computer"
                size={24}
                color={primaryColors.primary}
              />
            </View>
          </DivIconEquipamento>
          <DivEquipamentoESerial>
            <View>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  color: neutralColors.neutral,
                  fontSize: 16,
                }}
              >
                Equipamento
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  textTransform: "uppercase",
                  marginTop: -6,
                }}
              >
                {params.equipamento}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  color: neutralColors.neutral,
                  fontSize: 16,
                }}
              >
                Nº de Série
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  textTransform: "uppercase",
                  marginTop: -6,
                }}
              >
                {params.numeroSerial
                  ? `${params.numeroSerial}`
                  : "Não informado"}
              </Text>
            </View>
          </DivEquipamentoESerial>
        </Container>

        <Container style={{ gap: 14 }}>
          <View>
            <TituloDiv>Observações do Técnico</TituloDiv>
            <DivMotivoVisita>
              <Text style={{ fontFamily: "Poppins_400Regular" }}>
                {params.observacao || "Nenhuma observação registrada."}
              </Text>
            </DivMotivoVisita>
          </View>
          <View>
            <TituloDiv>Situação Final</TituloDiv>
            <View style={{ gap: 6 }}>
              {params.situacao
                ? params.situacao.split(",").map((item, index) => (
                    <TextoSituacao status={item.trim()} key={index}>
                      {item.trim()}
                    </TextoSituacao>
                  ))
                : "Nenhuma situação registrada."}
            </View>
          </View>
        </Container>

        {/* ÁREA DE ASSINATURAS */}
        <Container style={{ gap: 16 }}>
          <DivAssinatura>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: "#000",
                fontSize: 16,
              }}
            >
              ASSINATURA DO RESPONSÁVEL
            </Text>
            <Assinatura>
              {params.imgAssinaturaResponsavel && (
                <Image
                  source={{ uri: params.imgAssinaturaResponsavel }}
                  style={{
                    width: 200,
                    height: 100,
                    marginTop: 10,
                    resizeMode: "contain",
                  }}
                />
              )}
            </Assinatura>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 18,
                }}
              >
                {params.nomeResponsavel} - {params.cargoResponsavel}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                  color: neutralColors.neutral,
                  fontSize: 12,
                  marginTop: -6,
                }}
              >
                Nome e Cargo/Função
              </Text>
            </View>
          </DivAssinatura>
          <DivAssinatura>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: "#000",
                fontSize: 16,
              }}
            >
              ASSINATURA DO TÉCNICO
            </Text>
            <Assinatura>
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
            </Assinatura>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 18,
                }}
              >
                {params.nomeTecnico} - {params.matriculaTecnico}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                  color: neutralColors.neutral,
                  fontSize: 12,
                  marginTop: -6,
                }}
              >
                Nome e Matrícula
              </Text>
            </View>
          </DivAssinatura>
        </Container>
      </MainContainer>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
        }}
      >
        <BotaoBaixarPDF
          onPress={() => {
            const dadosParaPDF = {
              ...params,
              motivos: [params.motivos],
              situacao: [params.situacao],
            };

            gerarTermoPDF(dadosParaPDF);
          }}
        >
          <FontAwesome6 name="file-pdf" size={24} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins_500Medium",
              marginTop: 4,
            }}
          >
            Baixar PDF
          </Text>
        </BotaoBaixarPDF>
      </View>
    </ContainerScroll>
  );
}
