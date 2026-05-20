import AsyncStorage from "@react-native-async-storage/async-storage";
import { buscarChamados } from "../database/chamadoStorage";
import { sincronizarComNuvem } from "./api";
let isSyncing = false;

export const executarSincronizacaoEmBackground = async () => {
  if (isSyncing) return;
  isSyncing = true;

  try {
    const todosChamados = await buscarChamados();
    const chamadosPendentes = todosChamados.filter(
      (c) => c.status === "concluido" && !c.sincronizado,
    );

    if (chamadosPendentes.length === 0) {
      isSyncing = false;
      return;
    }

    console.log(
      `Iniciando envio de ${chamadosPendentes.length} chamados para a nuvem...`,
    );

    for (const chamado of chamadosPendentes) {
      try {
        await sincronizarComNuvem({ ...chamado, idChamado: chamado.id });
        const listaAtualizada = await buscarChamados();
        const listaSemOEnviado = listaAtualizada.filter(
          (c) => c.id !== chamado.id,
        );

        await AsyncStorage.setItem(
          "chamados",
          JSON.stringify(listaSemOEnviado),
        );

        console.log(
          `Chamado ${chamado.id} sincronizado e apagado da memória local!`,
        );
      } catch (err) {
        console.log(
          `Falha ao sincronizar o chamado ${chamado.id}. Tentaremos depois.`,
        );
      }
    }
  } catch (error) {
    console.error("Erro geral no motor de sincronização:", error);
  } finally {
    isSyncing = false;
  }
};
