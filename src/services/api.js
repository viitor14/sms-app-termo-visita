const BASE_URL = "http://192.168.60.166:3000";

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
