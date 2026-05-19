import {
  atualizarChamadoStorage,
  buscarChamados,
} from "../database/chamadoStorage";
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
        await atualizarChamadoStorage(chamado.id, {
          ...chamado,
          sincronizado: true,
        });

        console.log(`Chamado ${chamado.id} sincronizado com sucesso!`);
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
