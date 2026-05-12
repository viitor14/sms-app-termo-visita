import {
  EvilIcons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import { Alert } from "react-native";

import {
  buscarChamados,
  excluirChamadoStorage,
} from "../../database/chamadoStorage";

import { neutralColors } from "@/src/utils/colors";
import {
  BotaoContinuar,
  BotaoExcluir,
  ChamadoContainer,
  Container,
  DivBotoes,
  DivChegada,
  TextoBotao,
  TextoHorarioChegada,
  TextoId,
  TextoStatus,
  TextoTitulo,
} from "./styled";

export default function ChamadosAbertos() {
  const [chamadosAbertos, setChamadosAbertos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const todosChamados = await buscarChamados();

        const apenasAbertos = todosChamados.filter(
          (chamado) => chamado.status === "em_andamento",
        );

        setChamadosAbertos(apenasAbertos);
      } catch (error) {
        console.error("Erro ao carregar a tela: ", error);
      }
    };

    carregarDados();
  }, []);

  const handleExcluirChamado = (idParaExcluir) => {
    Alert.alert(
      "Excluir Chamado",
      "Tem certeza que deseja excluir este chamado? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, excluir",
          style: "destructive",
          onPress: async () => {
            await excluirChamadoStorage(idParaExcluir);

            setChamadosAbertos((listaAntiga) =>
              listaAntiga.filter((chamado) => chamado.id !== idParaExcluir),
            );
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <ChamadoContainer
      style={{
        shadowColor: "#00000078",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <TextoId>ID: {item.id}</TextoId>
      <DivChegada>
        <FontAwesome6 name="clock" size={20} color={neutralColors.n70} />
        <TextoHorarioChegada>Chegada: {item.chegada}</TextoHorarioChegada>
      </DivChegada>
      <TextoStatus>Status: Em Andamento</TextoStatus>
      <DivBotoes>
        <BotaoContinuar
          onPress={() => {
            router.push({
              pathname: "/chamado",
              params: {
                idChamado: item.id,
                horaChegada: item.chegada,
                unidade: item.unidade,
              },
            });
          }}
        >
          <EvilIcons name="pencil" size={24} color="#fff" />
          <TextoBotao>Continuar</TextoBotao>
        </BotaoContinuar>
        <BotaoExcluir onPress={() => handleExcluirChamado(item.id)}>
          <MaterialCommunityIcons
            name="delete-forever"
            size={20}
            color="#fff"
          />
          <TextoBotao>Excluir</TextoBotao>
        </BotaoExcluir>
      </DivBotoes>
    </ChamadoContainer>
  );

  return (
    <Container>
      <Stack.Screen options={{ title: "Chamados Abertos" }} />
      <TextoTitulo>Chamados em Andamento</TextoTitulo>

      <FlatList
        data={chamadosAbertos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum chamado aberto no momento.</Text>
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  textoStatus: { fontSize: 14, color: "#e67e22", fontWeight: "bold" },
  vazio: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#777" },
});
