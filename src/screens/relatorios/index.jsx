import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { buscarChamados } from "../../database/chamadoStorage";
import {
  CardRelatorio,
  Container,
  QuantidadeVisitas,
  Titulo,
  UnidadeNome,
} from "./styled";

export default function Relatorios() {
  const [estatisticas, setEstatisticas] = useState([]);

  useEffect(() => {
    const processarDados = async () => {
      const chamados = await buscarChamados();

      const concluidos = chamados.filter((c) => c.status === "concluido");

      // 2. Contamos as visitas por unidade usando o reduce
      const contagem = concluidos.reduce((acc, chamado) => {
        const nomeUnidade = chamado.unidade || "Não Identificada";
        acc[nomeUnidade] = (acc[nomeUnidade] || 0) + 1;
        return acc;
      }, {});

      // 3. Transformamos o objeto em uma lista ordenada para o FlatList
      const listaFormatada = Object.keys(contagem)
        .map((unidade) => ({
          nome: unidade,
          total: contagem[unidade],
        }))
        .sort((a, b) => b.total - a.total); // Mostra as mais visitadas primeiro

      setEstatisticas(listaFormatada);
    };

    processarDados();
  }, []);

  return (
    <Container>
      <Stack.Screen options={{ title: "Relatórios Gerenciais" }} />

      <Titulo>Total de Visitas por Unidade</Titulo>

      <FlatList
        data={estatisticas}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <CardRelatorio>
            <View>
              <UnidadeNome>{item.nome}</UnidadeNome>
              <Text style={{ color: "#666" }}>Visitas realizadas</Text>
            </View>
            <QuantidadeVisitas>{item.total}</QuantidadeVisitas>
          </CardRelatorio>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum chamado finalizado encontrado.
          </Text>
        }
      />
    </Container>
  );
}
