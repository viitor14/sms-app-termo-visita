import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajuda / Informações</Text>

      <Text style={styles.description}>
        Este app ajuda na geração de termos de visita com assinatura digital.
      </Text>

      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Voltar para o Início</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    padding: 10,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
