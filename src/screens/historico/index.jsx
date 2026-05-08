import { FontAwesome6 } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { buscarChamados } from "../../database/chamadoStorage";

export default function Historico() {
  const router = useRouter();
  const [chamadosConcluidos, setChamadosConcluidos] = useState([]);
  const [filtroUnidade, setFiltroUnidade] = useState("Todas"); // Começa mostrando todas
  const [unidadesDisponiveis, setUnidadesDisponiveis] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      const chamados = await buscarChamados();

      // Filtra apenas os que já foram finalizados
      const concluidos = chamados.filter((c) => c.status === "concluido");

      // Ordena do mais recente para o mais antigo (usando o ID que criamos com Date.now)
      concluidos.sort((a, b) => Number(b.id) - Number(a.id));

      setChamadosConcluidos(concluidos);

      // Extrai uma lista única de todas as unidades que ele já visitou para montar os botões de filtro
      const unidadesUnicas = [
        "Todas",
        ...new Set(concluidos.map((c) => c.unidade)),
      ];
      setUnidadesDisponiveis(unidadesUnicas);
    };

    carregarHistorico();
  }, []);

  // A MÁGICA DO FILTRO: Essa variável decide o que vai pra tela baseada no botão clicado
  const chamadosFiltrados =
    filtroUnidade === "Todas"
      ? chamadosConcluidos
      : chamadosConcluidos.filter((c) => c.unidade === filtroUnidade);

  // Função para quando o técnico clicar em "Visualizar"
  const handleVisualizar = (chamado) => {
    console.log("Chamado selecionado para visualização:", chamado);
    // Manda ele direto para uma nova tela com os dados completos, sem usar modais!
    router.push({
      pathname: "/visualizarChamado",
      params: {
        id: chamado.id,
        unidade: chamado.unidade,
        chegada: chamado.chegada,
        saida: chamado.saida,
        observacao: chamado.observacao,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}>
      <Stack.Screen options={{ title: "Histórico de Visitas" }} />

      {/* BARRA DE FILTROS DIRETA E RÁPIDA */}
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Filtrar por unidade:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {unidadesDisponiveis.map((unidade, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor:
                  filtroUnidade === unidade ? "#2ecc71" : "#e0e0e0",
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 10,
              }}
              onPress={() => setFiltroUnidade(unidade)}
            >
              <Text
                style={{
                  color: filtroUnidade === unidade ? "#fff" : "#333",
                  fontWeight: filtroUnidade === unidade ? "bold" : "normal",
                }}
              >
                {unidade}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA DOS CHAMADOS */}
      <FlatList
        data={chamadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.unidade}
            </Text>
            <Text style={{ color: "#666" }}>
              Data: {new Date(Number(item.id)).toLocaleDateString("pt-BR")}
            </Text>
            <Text style={{ color: "#666" }}>
              Horário: {item.chegada} às {item.saida}
            </Text>

            {/* BOTÃO VISUALIZAR DIRETO NO CARD */}
            <TouchableOpacity
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                padding: 10,
                borderRadius: 8,
                justifyContent: "center",
              }}
              onPress={() => handleVisualizar(item)}
            >
              <FontAwesome6
                name="eye"
                size={16}
                color="#333"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontWeight: "bold" }}>Ver Detalhes do Termo</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
            Nenhuma visita encontrada.
          </Text>
        }
      />
    </View>
  );
}
