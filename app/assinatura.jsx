import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

export default function TelaAssinatura() {
  const ref = useRef();
  const router = useRouter();

  // Função chamada quando o usuário confirma a assinatura
  const handleOK = (signature) => {
    console.log("Assinatura capturada (Base64):", signature);
    alert("Assinatura salva com sucesso!");
    // Aqui depois vamos gerar o PDF
    router.back(); // Volta para o formulário
  };

  return (
    <View style={styles.container}>
      <SignatureScreen
        ref={ref}
        onOK={handleOK}
        descriptionText="Assinatura do Cliente"
        clearText="Limpar"
        confirmText="Confirmar"
        webStyle={`.m-signature-pad--footer { border: none; }`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
