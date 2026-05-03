import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuScreen() {
  const router = useRouter();

  const abrirNovoChamado = () => {
    const horaAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    router.push({
      pathname: "/chamado",
      params: { horaChegada: horaAtual },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>O que você deseja fazer?</Text>

      <TouchableOpacity style={styles.botao} onPress={abrirNovoChamado}>
        <Text style={styles.textoBotao}>Abrir novo Chamado</Text>
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
