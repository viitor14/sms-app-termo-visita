import AsyncStorage from "@react-native-async-storage/async-storage";

// Essa é a "chave" ou o "nome da gaveta" onde vamos guardar os dados no celular
const CHAVE_CHAMADOS = "@chamados_visita";

// 1. FUNÇÃO PARA BUSCAR TODOS OS CHAMADOS
export const buscarChamados = async () => {
  try {
    const dadosFormatoTexto = await AsyncStorage.getItem(CHAVE_CHAMADOS);
    // Se tiver dados, transforma o texto de volta em Javascript (JSON). Se não, retorna uma lista vazia.
    return dadosFormatoTexto ? JSON.parse(dadosFormatoTexto) : [];
  } catch (error) {
    console.error("Erro ao buscar chamados: ", error);
    return [];
  }
};

// 2. FUNÇÃO PARA SALVAR UM NOVO CHAMADO (Quando o técnico clica em Abrir Chamado)
export const abrirNovoChamadoStorage = async (dadosIniciais) => {
  try {
    const chamadosExistentes = await buscarChamados();

    // Cria um ID único para o chamado (usando a data/hora exata em milissegundos)
    const novoChamado = {
      id: Date.now().toString(),
      status: "em_andamento",
      ...dadosIniciais,
    };

    // Adiciona o novo chamado na lista
    const novaLista = [...chamadosExistentes, novoChamado];

    // Transforma em texto e salva no celular
    await AsyncStorage.setItem(CHAVE_CHAMADOS, JSON.stringify(novaLista));

    return novoChamado; // Retorna o chamado criado (com o ID) para a tela usar
  } catch (error) {
    console.error("Erro ao abrir novo chamado: ", error);
  }
};

// 3. FUNÇÃO PARA ATUALIZAR UM CHAMADO (Quando ele finaliza e gera o PDF)
export const atualizarChamadoStorage = async (idChamado, dadosAtualizados) => {
  try {
    const chamadosExistentes = await buscarChamados();

    // Mapeia a lista e substitui apenas o chamado que tem o ID correspondente
    const novaLista = chamadosExistentes.map((chamado) => {
      if (chamado.id === idChamado) {
        return { ...chamado, ...dadosAtualizados, status: "concluido" };
      }
      return chamado;
    });

    await AsyncStorage.setItem(CHAVE_CHAMADOS, JSON.stringify(novaLista));
  } catch (error) {
    console.error("Erro ao atualizar chamado: ", error);
  }
};

// FUNÇÃO PARA EXCLUIR UM CHAMADO
export const excluirChamadoStorage = async (idChamado) => {
  try {
    const chamadosExistentes = await buscarChamados();

    // O filter cria uma nova lista contendo APENAS os chamados que têm o ID diferente do que queremos excluir
    const novaLista = chamadosExistentes.filter(
      (chamado) => chamado.id !== idChamado,
    );

    // Salva a nova lista (agora sem o chamado excluído) de volta no celular
    await AsyncStorage.setItem(CHAVE_CHAMADOS, JSON.stringify(novaLista));
  } catch (error) {
    console.error("Erro ao excluir chamado: ", error);
  }
};
