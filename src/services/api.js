const BASE_URL = "http://192.168.60.166:3000";
const API_KEY = process.env.API_KEY;

export const sincronizarComNuvem = async (chamado) => {
  try {
    const response = await fetch(`${BASE_URL}/chamados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chamado),
    });

    if (!response.ok) {
      throw new Error("Falha na comunicação com o servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro DETALHADO na API:", error.message);
    throw error;
  }
};

export const buscarChamadosDaNuvem = async () => {
  try {
    const response = await fetch(`${BASE_URL}/chamados`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY, // Injeta a chave aqui invisivelmente!
      },
    });
    if (!response.ok) throw new Error("Falha ao buscar da nuvem");
    return await response.json();
  } catch (error) {
    console.log("Sem acesso à nuvem no momento.");
    return null;
  }
};

export const buscarChamadoPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/chamados/${id}`);
    if (!response.ok) throw new Error("Falha ao carregar detalhes do chamado");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar chamado por ID:", error);
    throw error;
  }
};

export const atualizarUnidadeNaNuvem = async (id, novaUnidade) => {
  try {
    const response = await fetch(`${BASE_URL}/chamados/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unidade: novaUnidade }),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a unidade no servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar unidade na API:", error);
    throw error;
  }
};
