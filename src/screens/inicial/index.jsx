import { FontAwesome5 } from "@expo/vector-icons/";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  BotaoAcao,
  Container,
  DivBotoesActions,
  Header,
  TextoBotoes,
} from "./styled";

import { abrirNovoChamadoStorage } from "../../database/chamadoStorage";
import { primaryColors } from "../../utils/colors";
import ChamadosAbertos from "../chamados";
export default function TelaInicial() {
  const router = useRouter();

  const handleAbrirNovoChamado = async () => {
    try {
      const horaAtual = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const chamadoCriado = await abrirNovoChamadoStorage({
        chegada: horaAtual,
        data: new Date().toLocaleDateString("pt-BR"),
      });

      // 4. Navegamos para a tela de chamado, mas agora mandamos o ID oficial do banco!
      router.push({
        pathname: "/chamado",
        params: {
          idChamado: chamadoCriado.id,
          horaChegada: chamadoCriado.chegada,
        },
      });
    } catch (error) {
      console.error("Erro ao iniciar o chamado:", error);
      alert("Não foi possível iniciar o chamado. Tente novamente.");
    }
  };

  const handleIrParaRelatorios = () => {
    router.push("/relatorios");
  };

  const handleIrParaHistorico = () => {
    router.push("/historico");
  };

  return (
    <Container>
      <Header>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 20,
            color: primaryColors.primary,
          }}
        >
          Olá, Técnico
        </Text>
      </Header>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 14,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 32,
        }}
      >
        <ChamadosAbertos />
        <DivBotoesActions>
          <BotaoAcao onPress={handleAbrirNovoChamado}>
            <FontAwesome5 name="clipboard-list" size={24} color="#fff" />
            <TextoBotoes>Abrir novo chamado</TextoBotoes>
          </BotaoAcao>

          <BotaoAcao onPress={handleIrParaHistorico}>
            <FontAwesome5 name="clipboard-list" size={24} color="#fff" />
            <TextoBotoes>Histórico</TextoBotoes>
          </BotaoAcao>
        </DivBotoesActions>
      </ScrollView>
    </Container>
  );
}
const styles = StyleSheet.create({
  titulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    marginBottom: 20,
    color: "#333",
  },

  botao: {
    backgroundColor: "#003FA3",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },

  botaoSecundario: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#003FA3",
  },

  textoSecundario: {
    color: "#003FA3",
  },
});
