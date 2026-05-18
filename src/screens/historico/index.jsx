import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { buscarChamados } from "../../database/chamadoStorage";

import { neutralColors, primaryColors } from "@/src/utils/colors";
import {
  BotaoItemDropdown,
  BotaoListaUnidades,
  BotaoVisualizarTermo,
  Container,
  DivDataEHora,
  DivIconView,
  DivNomeUnidade,
  DivVisitas,
  ListaUnidadesAberta,
  NomeUnidade,
  TextoFiltrarUnidade,
  TextoItemDropdown,
  TextoNomeUnidade,
} from "./styled";

export default function Historico() {
  const router = useRouter();
  const [chamadosConcluidos, setChamadosConcluidos] = useState([]);
  const [filtroUnidade, setFiltroUnidade] = useState("Todas");
  const [filtroData, setFiltroData] = useState("Todas");
  const [unidadesDisponiveis, setUnidadesDisponiveis] = useState([]);
  const [listaAberta, setListaAberta] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const carregarHistorico = async () => {
        const chamados = await buscarChamados();
        const concluidos = chamados.filter((c) => c.status === "concluido");

        concluidos.sort((a, b) => Number(b.id) - Number(a.id));

        setChamadosConcluidos(concluidos);

        const unidadesUnicas = [
          "Todas",
          ...new Set(concluidos.map((c) => c.unidade)),
        ];
        setUnidadesDisponiveis(unidadesUnicas);
      };

      carregarHistorico();
    }, []),
  );

  const chamadosFiltrados = chamadosConcluidos.filter((chamado) => {
    // 1. O chamado passa na unidade se o filtro for "Todas" OU se for igual à unidade escolhida
    const passaNaUnidade =
      filtroUnidade === "Todas" || chamado.unidade === filtroUnidade;

    // 2. O chamado passa na data se o filtro for "Todas" OU se a data for igual à data escolhida
    // (Lembre-se de substituir 'chamado.data' pelo nome real do campo que guarda a data no seu banco)
    const passaNaData = filtroData === "Todas" || chamado.data === filtroData;

    // 3. O card só será exibido se passar nos dois testes ao mesmo tempo
    return passaNaUnidade && passaNaData;
  });

  //const chamadosFiltrados =
  // filtroUnidade === "Todas"
  //    ? chamadosConcluidos
  //    : chamadosConcluidos.filter((c) => c.unidade === filtroUnidade);

  const handleVisualizar = (chamado) => {
    router.push({
      pathname: "/visualizarChamado",
      params: {
        id: chamado.id,
        unidade: chamado.unidade,
        chegada: chamado.chegada,
        saida: chamado.saida,
        data: chamado.data,
        motivos: chamado.motivos,
        equipamento: chamado.equipamento,
        numeroSerial: chamado.numeroSerie,
        observacao: chamado.obsTecnicas,
        servico: chamado.servico,
        situacao: chamado.situacao,
        nomeResponsavel: chamado.responsavelNome,
        cargoResponsavel: chamado.responsavelCargo,
        imgAssinaturaResponsavel: chamado.imgAssinaturaResponsavel,
        nomeTecnico: chamado.tecnico,
        matriculaTecnico: chamado.matricula,
        imgAssinaturaTecnico: chamado.imgAssinaturaTecnico,
      },
    });
  };

  return (
    <Container>
      <Stack.Screen options={{ title: "Histórico de Visitas" }} />

      <View style={{ marginBottom: 15, zIndex: 10 }}>
        <TextoFiltrarUnidade>Filtrar por unidade:</TextoFiltrarUnidade>

        <BotaoListaUnidades onPress={() => setListaAberta(!listaAberta)}>
          <TextoNomeUnidade>{filtroUnidade}</TextoNomeUnidade>

          {listaAberta ? (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          ) : (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          )}
        </BotaoListaUnidades>

        {listaAberta && (
          <ListaUnidadesAberta>
            <ScrollView
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              {unidadesDisponiveis.map((unidade, index) => {
                const itemSelecionado = filtroUnidade === unidade;
                const ultimoItem = index === unidadesDisponiveis.length - 1;

                return (
                  <BotaoItemDropdown
                    key={index}
                    isSelected={itemSelecionado}
                    isLastItem={ultimoItem}
                    onPress={() => {
                      setFiltroUnidade(unidade);
                      setListaAberta(false);
                    }}
                  >
                    <TextoItemDropdown isSelected={itemSelecionado}>
                      {unidade}
                    </TextoItemDropdown>
                  </BotaoItemDropdown>
                );
              })}
            </ScrollView>
          </ListaUnidadesAberta>
        )}
      </View>

      {/* LISTA DOS CHAMADOS */}
      <FlatList
        data={chamadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DivVisitas
            style={{
              elevation: 2,
            }}
          >
            <DivNomeUnidade>
              <NomeUnidade>{item.unidade}</NomeUnidade>
              <FontAwesome6
                name="building"
                size={18}
                color={neutralColors.neutral}
              />
            </DivNomeUnidade>
            <DivDataEHora>
              <View
                style={{
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <FontAwesome6
                    name="calendar"
                    size={18}
                    color={neutralColors.neutral}
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      color: neutralColors.neutral,
                    }}
                  >
                    {item.data}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <FontAwesome6
                    name="clock"
                    size={18}
                    color={neutralColors.neutral}
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      color: neutralColors.neutral,
                    }}
                  >
                    {item.chegada} às {item.saida}
                  </Text>
                </View>
              </View>

              <BotaoVisualizarTermo onPress={() => handleVisualizar(item)}>
                <DivIconView>
                  <FontAwesome6
                    name="eye"
                    size={18}
                    color={primaryColors.primary}
                  />
                </DivIconView>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={neutralColors.neutral}
                />
              </BotaoVisualizarTermo>
            </DivDataEHora>
          </DivVisitas>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
            Nenhuma visita encontrada.
          </Text>
        }
      />
    </Container>
  );
}
