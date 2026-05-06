import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { abrirNovoChamadoStorage } from "../src/database/chamadoStorage";
export default function MenuScreen() {
  const router = useRouter();

  const handleAbrirNovoChamado = async () => {
    try {
      const horaAtual = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const chamadoCriado = await abrirNovoChamadoStorage({
        chegada: horaAtual,
        data: new Date().toLocaleDateString("pt-BR"),
      });

      // 4. Navegamos para a tela de chamado, mas agora mandamos o ID oficial do banco!
      router.push({
        pathname: "/chamado",
        params: {
          idChamado: chamadoCriado.id,
          horaChegada: chamadoCriado.chegada,
        },
      });
    } catch (error) {
      console.error("Erro ao iniciar o chamado:", error);
      alert("Não foi possível iniciar o chamado. Tente novamente.");
    }
  };

  const handleBuscarChamados = () => {
    router.push("/chamadoAbertos");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>O que você deseja fazer?</Text>

      <TouchableOpacity style={styles.botao} onPress={handleAbrirNovoChamado}>
        <Text style={styles.textoBotao}>Abrir novo Chamado</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={handleBuscarChamados}>
        <Text style={styles.textoBotao}>Buscar Chamados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    gap: 16,
  },

  titulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    marginBottom: 20,
    color: "#333",
  },

  botao: {
    backgroundColor: "#003FA3",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },

  botaoSecundario: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#003FA3",
  },

  textoSecundario: {
    color: "#003FA3",
  },
});
