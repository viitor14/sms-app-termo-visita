import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Alert } from "react-native";

import {
  buscarChamados,
  excluirChamadoStorage,
} from "../../database/chamadoStorage";

import { neutralColors, secondaryColors } from "../../utils/colors";
import {
  BotaoExcluir,
  ChamadoContainer,
  Container,
  DivBotoes,
  DivChegada,
  DivStatusChamado,
  TextoBotao,
  TextoHorarioChegada,
  TextoId,
  TextoStatus,
} from "./styled";

export default function ChamadosAbertos() {
  const [chamadosAbertos, setChamadosAbertos] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

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
      key={item.id}
      style={{
        shadowColor: "#00000078",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
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
      <TextoId>ID: {item.id}</TextoId>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DivChegada>
          <FontAwesome6 name="clock" size={20} color={neutralColors.n70} />
          <TextoHorarioChegada>Chegada: {item.chegada}</TextoHorarioChegada>
        </DivChegada>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={neutralColors.n70}
        />
      </View>
      <DivBotoes>
        <DivStatusChamado>
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={20}
            color={secondaryColors.secondary}
          />
          <TextoStatus>Em Andamento</TextoStatus>
        </DivStatusChamado>
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
      {chamadosAbertos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum chamado aberto no momento.</Text>
      ) : (
        chamadosAbertos.map((chamado) => renderItem({ item: chamado }))
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  vazio: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#777" },
});
