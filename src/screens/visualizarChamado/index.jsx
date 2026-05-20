import { EvilIcons, FontAwesome6 } from "@expo/vector-icons/";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  atualizarUnidadeNaNuvem,
  buscarChamadoPorId,
} from "../../services/api";
import { neutralColors, primaryColors } from "../../utils/colors";
import { listaUnidades } from "../../utils/listaUnidades";
import { gerarTermoPDF } from "../../utils/pdfGenerator";

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
  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  console.log(params);
  const [estaEditando, setEstaEditando] = useState(false);

  useEffect(() => {
    const carregarDadosDoChamado = async () => {
      try {
        setLoading(true);
        const dados = await buscarChamadoPorId(params.id);
        console.log(dados);
        setChamado(dados);
        setUnidadeSelecionada(dados.unidade);
      } catch (error) {
        alert("Não foi possível carregar os detalhes deste chamado.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      carregarDadosDoChamado();
    }
  }, [params.id]);

  const handleEscolherUnidade = async (novaUnidade) => {
    try {
      setEstaEditando(false);
      setUnidadeSelecionada(novaUnidade);
      await atualizarUnidadeNaNuvem(params.id, novaUnidade);
    } catch (error) {
      console.error("Erro ao salvar a nova unidade na nuvem:", error);
      alert("Erro ao sincronizar a nova unidade. Verifique a internet.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>
          Buscando dados na nuvem...
        </Text>
      </View>
    );
  }

  if (!chamado) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>
          Chamado não encontrado.
        </Text>
      </View>
    );
  }

  const listaSituacoes = Array.isArray(chamado.situacao)
    ? chamado.situacao
    : chamado.situacao
      ? String(chamado.situacao).split(",")
      : [];

  const listaMotivos = Array.isArray(chamado.motivos)
    ? chamado.motivos
    : chamado.motivos
      ? String(chamado.motivos).split(",")
      : [];

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
              {params.id
                ? params.id.split("-")[0].toUpperCase()
                : "AGUARDANDO..."}
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
                {chamado.data}
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
                {chamado.chegada} - {chamado.saida}
              </Text>
            </DivData>
          </DivDataEHorario>
          <DivMotivoEServico>
            <TituloDiv>Motivo da Visita</TituloDiv>
            <DivMotivoVisita>
              {listaMotivos.map((item, index) => (
                <Text key={index} style={{ fontFamily: "Poppins_500Medium" }}>
                  • {item}
                </Text>
              ))}
            </DivMotivoVisita>
          </DivMotivoEServico>
          <DivMotivoEServico>
            <TituloDiv>Serviço Realizado</TituloDiv>
            <DivMotivoVisita>
              <Text style={{ fontFamily: "Poppins_400Regular" }}>
                {chamado.servico}
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
                {chamado.equipamento
                  ? `${chamado.equipamento}`
                  : "Não informado"}
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
                {chamado.numeroSerial
                  ? `${chamado.numeroSerial}`
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
                {chamado.observacao || "Nenhuma observação registrada."}
              </Text>
            </DivMotivoVisita>
          </View>
          <View>
            <TituloDiv>Situação Final</TituloDiv>
            <View style={{ gap: 6 }}>
              {listaSituacoes.length > 0 ? (
                listaSituacoes.map((item, index) => (
                  <TextoSituacao status={item.trim()} key={index}>
                    {item.trim()}
                  </TextoSituacao>
                ))
              ) : (
                <TextoSituacao>Nenhuma situação registrada.</TextoSituacao>
              )}
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
              {chamado.imgAssinaturaResponsavel && (
                <Image
                  source={{ uri: chamado.imgAssinaturaResponsavel }}
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
                {chamado.responsavelNome} - {chamado.responsavelCargo}
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
              {chamado.imgAssinaturaTecnico && (
                <Image
                  source={{ uri: chamado.imgAssinaturaTecnico }}
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
                {chamado.tecnico}- {chamado.matricula}
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
              ...chamado,
              motivos: [chamado.motivos],
              situacao: [chamado.situacao],
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
