import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";

import FormTermoInput from "../src/components/FormTermoInput/Index";

export default function Home() {
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const signatureRef = useRef();

  // Função disparada quando o usuário clica no botão "Gerar Termo"
  const handleFinalizar = () => {
    if (!cliente || !servico) {
      Alert.alert(
        "Atenção",
        "Preencha o cliente e o serviço antes de finalizar.",
      );
      return;
    }
    // Isso solicita a imagem ao componente de assinatura
    signatureRef.current.readSignature();
  };

  // Função chamada automaticamente após o readSignature() ter sucesso
  const gerarPDF = async (signature) => {
    try {
      const htmlContent = `
        <html>
          <body style="font-family: sans-serif; padding: 20px;">
            <h1 style="text-align: center;">Termo de Visita Técnica</h1>
            <p><strong>Cliente:</strong> ${cliente}</p>
            <p><strong>Serviço realizado:</strong> ${servico}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString("pt-BR")}</p>
            <br/><br/>
            <div style="text-align: center;">
              <p>__________________________________________</p>
              <p>Assinatura do Cliente</p>
              <img src="${signature}" style="width: 300px; margin-top: 10px;" />
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o PDF");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={styles.title}>Novo Termo de Visita</Text>
      FormSe
      <FormTermoInput
        label="Cliente"
        value={cliente}
        onChangeText={setCliente}
        placeholder="Nome do cliente"
      />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descrição do Serviço</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={servico}
          onChangeText={setServico}
          placeholder="O que foi resolvido?"
          multiline
        />
      </View>
      <Text style={styles.label}>Assinatura do Cliente:</Text>
      {/* Campo de Assinatura com altura fixa */}
      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={signatureRef}
          onOK={gerarPDF}
          descriptionText="Assine acima"
          clearText="Limpar"
          confirmText="Salvar Assinatura"
          webStyle={`
            .m-signature-pad--footer { display: none; } 
            body,html { height: 200px; }
          `}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
        <Text style={styles.buttonText}>Gerar e Enviar Termo PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    color: "#333",
  },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5, color: "#444" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  signatureContainer: {
    width: "100%",
    height: 220,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
