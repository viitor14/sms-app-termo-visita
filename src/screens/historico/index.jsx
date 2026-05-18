import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [unidadesDisponiveis, setUnidadesDisponiveis] = useState([]);
  const [listaUnidadeAberta, setListaUnidadeAberta] = useState(false); // Renomeado para clareza
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla se o calendário está aberto
  const [dateSelecionada, setDateSelecionada] = useState(new Date());
  const [filtroData, setFiltroData] = useState("Todas");
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [listaDataAberta, setListaDataAberta] = useState(false); // Novo estado para abrir/fechar

  const formatarDataParaString = (data) => {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); // Esconde o calendário logo após escolher

    if (event.type === "set" && selectedDate) {
      setDateSelecionada(selectedDate);
      // Transforma a data do calendário no formato "17/05/2026"
      const dataFormatada = formatarDataParaString(selectedDate);
      setFiltroData(dataFormatada);
    }
  };
  const limparFiltroData = () => {
    setFiltroData("Todas");
  };
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
        const datasUnicas = [
          "Todas",
          ...new Set(concluidos.map((c) => c.data)),
        ];
        setDatasDisponiveis(datasUnicas);
      };

      carregarHistorico();
    }, []),
  );

  const chamadosFiltrados = chamadosConcluidos.filter((chamado) => {
    const passaNaUnidade =
      filtroUnidade === "Todas" || chamado.unidade === filtroUnidade;
    const passaNaData = filtroData === "Todas" || chamado.data === filtroData;
    return passaNaUnidade && passaNaData;
  });

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

      {/* ÁREA DOS FILTROS */}
      <View
        style={{ marginBottom: 15, zIndex: 10, flexDirection: "row", gap: 10 }}
      >
        {/* DROPDOWN DE UNIDADES */}
        <View style={{ flex: 1, zIndex: listaUnidadeAberta ? 20 : 10 }}>
          <TextoFiltrarUnidade>Unidade:</TextoFiltrarUnidade>
          <BotaoListaUnidades
            onPress={() => {
              setListaUnidadeAberta(!listaUnidadeAberta);
              setListaDataAberta(false); // Fecha o outro dropdown se abrir este
            }}
          >
            <TextoNomeUnidade numberOfLines={1}>
              {filtroUnidade}
            </TextoNomeUnidade>
            <MaterialIcons
              name={
                listaUnidadeAberta ? "keyboard-arrow-up" : "keyboard-arrow-down"
              }
              size={24}
              color="black"
            />
          </BotaoListaUnidades>

          {listaUnidadeAberta && (
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
                        setListaUnidadeAberta(false);
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

        {/* DROPDOWN DE DATAS (NOVO) */}
        <View style={{ flex: 1, zIndex: 10 }}>
          <TextoFiltrarUnidade>Data:</TextoFiltrarUnidade>

          <BotaoListaUnidades
            onPress={() => {
              setShowDatePicker(true);
              setListaUnidadeAberta(false); // Fecha o dropdown de unidades se estiver aberto
            }}
          >
            <TextoNomeUnidade numberOfLines={1}>{filtroData}</TextoNomeUnidade>

            {/* Se tiver uma data filtrada, mostra um X para limpar. Se não, mostra o ícone de calendário */}
            {filtroData !== "Todas" ? (
              <MaterialIcons
                name="close"
                size={24}
                color="red"
                onPress={limparFiltroData} // Botão de limpar!
              />
            ) : (
              <FontAwesome6 name="calendar" size={18} color="black" />
            )}
          </BotaoListaUnidades>

          {/* O Calendário Invisível (Ele só aparece quando showDatePicker for true) */}
          {showDatePicker && (
            <DateTimePicker
              value={dateSelecionada}
              mode="date"
              display="default"
              onChange={onChangeDate}
              locale="pt-BR"
            />
          )}
        </View>
      </View>

      {/* LISTA DOS CHAMADOS */}
      <FlatList
        data={chamadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DivVisitas style={{ elevation: 2 }}>
            <DivNomeUnidade>
              <NomeUnidade>{item.unidade}</NomeUnidade>
              <FontAwesome6
                name="building"
                size={18}
                color={neutralColors.neutral}
              />
            </DivNomeUnidade>
            <DivDataEHora>
              <View style={{ justifyContent: "space-between" }}>
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
