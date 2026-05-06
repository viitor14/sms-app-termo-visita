import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Alert } from "react-native";

import {
  buscarChamados,
  excluirChamadoStorage,
} from "../../database/chamadoStorage";

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
            // 1. Exclui do banco de dados (AsyncStorage)
            await excluirChamadoStorage(idParaExcluir);

            // 2. Atualiza a lista na tela NA MESMA HORA
            // Isso filtra a lista atual e remove o card que acabou de ser excluído
            setChamadosAbertos((listaAntiga) =>
              listaAntiga.filter((chamado) => chamado.id !== idParaExcluir),
            );
          },
        },
      ],
    );
  };

  // Função que diz como cada "card" de chamado vai ser desenhado na tela
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
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
      <Text style={styles.textoCard}>Chamado ID: {item.id}</Text>
      <Text style={styles.textoCard}>Chegada: {item.chegada}</Text>
      <Text style={styles.textoStatus}>Status: Em Andamento</Text>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => handleExcluirChamado(item.id)} // 👈 A mágica acontece aqui!
      >
        <Text style={styles.textoBotao}>Excluir Chamado</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Chamados Abertos" }} />
      <Text style={styles.titulo}>Chamados em Andamento</Text>

      <FlatList
        data={chamadosAbertos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum chamado aberto no momento.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  textoCard: { fontSize: 16, marginBottom: 5 },
  textoStatus: { fontSize: 14, color: "#e67e22", fontWeight: "bold" },
  vazio: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#777" },
});
