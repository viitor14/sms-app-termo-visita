import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useEffect, useRef, useState } from "react";
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

import FormCheckbox from "../src/components/FormCheckbox";
import FormTermoInput from "../src/components/FormInput";
import FormSection from "../src/components/FormSection";

export default function Home() {
  const [formData, setFormData] = useState({
    unidade: "",
    data: new Date().toLocaleDateString("pt-BR"),
    chegada: "",
    saida: "",
    matricula: "81683",
    tecnico: "VITOR FRANÇA",
    motivos: [],
    equipamento: "",
    servico: "",
    situacao: [],
    obsTecnicas: "",
    responsavelNome: "",
    responsavelCargo: "",
    testemunhaNome: "",
    // Usaremos apenas estas 3 variáveis para as imagens
    imgAssinaturaResponsavel: null,
    imgAssinaturaTecnico: null,
    imgAssinaturaTestemunha: null,
  });

  // MÁGICA AQUI: Isso garante que o PDF veja os dados atualizados mesmo após o setTimeout
  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Apenas as 3 refs que realmente usamos
  const refAssinaturaResponsavel = useRef();
  const refAssinaturaTecnico = useRef();
  const refAssinaturaTestemunha = useRef();

  // Função atualizada para evitar que um dado atropele o outro
  const handleInputChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  // Função atualizada para multiseleção segura
  const handleToggleArray = (campo, opcao) => {
    setFormData((prev) => {
      const listaAtual = prev[campo];
      const jaSelecionado = listaAtual.includes(opcao);
      if (jaSelecionado) {
        return { ...prev, [campo]: listaAtual.filter((i) => i !== opcao) };
      } else {
        return { ...prev, [campo]: [...listaAtual, opcao] };
      }
    });
  };

  const handleFinalizar = () => {
    if (!formData.unidade || !formData.servico) {
      Alert.alert("Atenção", "Preencha a unidade e o serviço.");
      return;
    }

    // Pede para as telas gerarem a imagem base64
    refAssinaturaResponsavel.current?.readSignature();
    refAssinaturaTecnico.current?.readSignature();
    refAssinaturaTestemunha.current?.readSignature();

    // Aguarda o processamento das 3 imagens e chama o PDF
    setTimeout(() => {
      gerarPDF();
    }, 1500);
  };

  const gerarPDF = async () => {
    try {
      // Usamos o REF aqui para garantir que ele pegue as imagens recém salvas!
      const dados = formDataRef.current;

      const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #000; }
            h2 { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .info-table { width: 100%; margin-bottom: 20px; }
            .info-table td { padding: 5px 0; }
            hr { border: 0; border-top: 1px solid #ccc; margin: 20px 0; }
            
            .signature-section { 
              display: flex; 
              flex-wrap: wrap; 
              justify-content: space-between; 
              margin-top: 40px; 
            }
            .signature-box { 
              width: 30%; 
              text-align: center; 
              min-width: 200px;
              margin-bottom: 30px;
            }
            .sig-img { 
              width: 100%; 
              max-width: 200px; 
              height: auto; 
              border-bottom: 1px solid #000; 
            }
            .sig-empty {
              width: 100%;
              max-width: 200px;
              height: 60px;
              border-bottom: 1px solid #000;
              margin: 0 auto;
            }
            .sig-label { font-size: 12px; margin-top: 5px; font-weight: bold; }
            .sig-sub { font-size: 10px; color: #555; }
          </style>
        </head>
        <body>
          <h2>CONTROLE DE VISITA TÉCNICA - IPOJUCA</h2>
          
          <table class="info-table">
            <tr>
              <td><strong>Unidade:</strong> ${dados.unidade}</td>
              <td style="text-align: right;"><strong>Data:</strong> ${dados.data}</td>
            </tr>
            <tr>
              <td><strong>Técnico:</strong> ${dados.tecnico}</td>
              <td style="text-align: right;"><strong>Matrícula:</strong> ${dados.matricula}</td>
            </tr>
            <tr>
              <td colspan="2"><strong>Horário:</strong> ${dados.chegada} às ${dados.saida}</td>
            </tr>
          </table>

          <hr/>
          <p><strong>Motivos:</strong> ${dados.motivos.join(", ")}</p>
          <p><strong>Equipamento/Setor:</strong> ${dados.equipamento}</p>
          <p><strong>Serviço Realizado:</strong> ${dados.servico}</p>
          <p><strong>Situação Final:</strong> ${dados.situacao.join(", ")}</p>
          <p><strong>Observações:</strong> ${dados.obsTecnicas}</p>

          <div class="signature-section">
            <div class="signature-box">
              ${dados.imgAssinaturaResponsavel ? `<img src="${dados.imgAssinaturaResponsavel}" class="sig-img" />` : '<div class="sig-empty"></div>'}
              <p class="sig-label">${dados.responsavelNome || "_________________________"}</p>
              <p class="sig-sub">${dados.responsavelCargo || "Cargo"}</p>
              <p class="sig-sub">Responsável Unidade</p>
            </div>

            <div class="signature-box">
              ${dados.imgAssinaturaTecnico ? `<img src="${dados.imgAssinaturaTecnico}" class="sig-img" />` : '<div class="sig-empty"></div>'}
              <p class="sig-label">${dados.tecnico}</p>
              <p class="sig-sub">Matrícula: ${dados.matricula}</p>
              <p class="sig-sub">Técnico de TIC</p>
            </div>

            <div class="signature-box">
               ${dados.imgAssinaturaTestemunha ? `<img src="${dados.imgAssinaturaTestemunha}" class="sig-img" />` : '<div class="sig-empty"></div>'}
              <p class="sig-label">${dados.testemunhaNome || "_________________________"}</p>
              <p class="sig-sub">Testemunha / Visitante</p>
            </div>
          </div>
        </body>
      </html>
    `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível gerar o PDF. Tente novamente.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.title}>Novo Termo de Visita</Text>

      <FormSection title="1. IDENTIFICAÇÃO DA UNIDADE">
        <FormTermoInput
          label="UNIDADE VISITADA"
          value={formData.unidade}
          onChangeText={(t) => handleInputChange("unidade", t)}
          placeholder="Nome da Unidade"
        />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <FormTermoInput
              label="CHEGADA"
              value={formData.chegada}
              onChangeText={(t) => handleInputChange("chegada", t)}
              placeholder="08:00"
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormTermoInput
              label="SAÍDA"
              value={formData.saida}
              onChangeText={(t) => handleInputChange("saida", t)}
              placeholder="10:00"
            />
          </View>
        </View>
      </FormSection>

      <FormSection title="2. MOTIVO DA VISITA">
        <FormCheckbox
          label="Manutenção Preventiva"
          selected={formData.motivos.includes("Manutenção Preventiva")}
          onPress={() => handleToggleArray("motivos", "Manutenção Preventiva")}
        />
        <FormCheckbox
          label="Instalação de Equipamento"
          selected={formData.motivos.includes("Instalação de Equipamento")}
          onPress={() =>
            handleToggleArray("motivos", "Instalação de Equipamento")
          }
        />
        <FormCheckbox
          label="Rede / Internet"
          selected={formData.motivos.includes("Rede / Internet")}
          onPress={() => handleToggleArray("motivos", "Rede / Internet")}
        />
      </FormSection>

      <FormSection title="3. EQUIPAMENTOS / SERVIÇO">
        <FormTermoInput
          label="EQUIPAMENTO / SETOR"
          value={formData.equipamento}
          onChangeText={(t) => handleInputChange("equipamento", t)}
          placeholder="Ex: Desktop, Impressora..."
        />
        <Text style={styles.labelInterno}>DESCRIÇÃO DO SERVIÇO</Text>
        <TextInput
          style={styles.inputArea}
          value={formData.servico}
          onChangeText={(t) => handleInputChange("servico", t)}
          placeholder="Descreva o que foi resolvido"
          multiline
        />
      </FormSection>

      <FormSection title="4. SITUAÇÃO FINAL">
        <FormCheckbox
          label="Problema Resolvido"
          selected={formData.situacao.includes("Problema Resolvido")}
          onPress={() => handleToggleArray("situacao", "Problema Resolvido")}
        />
        <FormCheckbox
          label="Necessita Retorno"
          selected={formData.situacao.includes("Necessita Retorno")}
          onPress={() => handleToggleArray("situacao", "Necessita Retorno")}
        />
        <Text style={styles.labelInterno}>OBSERVAÇÕES TÉCNICAS</Text>
        <TextInput
          style={[styles.inputArea, { height: 60 }]}
          value={formData.obsTecnicas}
          onChangeText={(t) => handleInputChange("obsTecnicas", t)}
          placeholder="Observações..."
          multiline
        />
      </FormSection>

      <FormSection title="5. RESPONSÁVEL DA UNIDADE">
        <FormTermoInput
          label="NOME DO RESPONSÁVEL"
          value={formData.responsavelNome}
          onChangeText={(t) => handleInputChange("responsavelNome", t)}
        />
        <FormTermoInput
          label="CARGO"
          value={formData.responsavelCargo}
          onChangeText={(t) => handleInputChange("responsavelCargo", t)}
        />
      </FormSection>

      <FormSection title="ASSINATURA: RESPONSÁVEL (ACOMPANHAMENTO)">
        <View style={styles.signatureContainer}>
          <SignatureScreen
            ref={refAssinaturaResponsavel}
            onOK={(img) => handleInputChange("imgAssinaturaResponsavel", img)}
            onEmpty={() => handleInputChange("imgAssinaturaResponsavel", null)}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            descriptionText="Assinatura do Responsável"
            webStyle={`.m-signature-pad--footer { display: none; } body,html { height: 180px; }`}
          />
        </View>
      </FormSection>

      <FormSection title="ASSINATURA: TÉCNICO DE TIC">
        <Text style={styles.labelInterno}>Técnico: {formData.tecnico}</Text>
        <View style={styles.signatureContainer}>
          <SignatureScreen
            ref={refAssinaturaTecnico}
            onOK={(img) => handleInputChange("imgAssinaturaTecnico", img)}
            onEmpty={() => handleInputChange("imgAssinaturaTecnico", null)}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            descriptionText="Assinatura do Técnico"
            webStyle={`.m-signature-pad--footer { display: none; } body,html { height: 180px; }`}
          />
        </View>
      </FormSection>

      <FormSection title="ASSINATURA: TESTEMUNHA">
        <FormTermoInput
          label="NOME DA TESTEMUNHA"
          value={formData.testemunhaNome}
          onChangeText={(t) => handleInputChange("testemunhaNome", t)}
        />
        <View style={styles.signatureContainer}>
          <SignatureScreen
            ref={refAssinaturaTestemunha}
            onOK={(img) => handleInputChange("imgAssinaturaTestemunha", img)}
            onEmpty={() => handleInputChange("imgAssinaturaTestemunha", null)}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            descriptionText="Assinatura da Testemunha"
            webStyle={`.m-signature-pad--footer { display: none; } body,html { height: 180px; }`}
          />
        </View>
      </FormSection>

      <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
        <Text style={styles.buttonText}>Gerar e Enviar Termo PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    color: "#333",
    textAlign: "center",
  },
  row: { flexDirection: "row" },
  labelInterno: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#444",
  },
  inputArea: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    height: 90,
    textAlignVertical: "top",
  },
  signatureContainer: {
    width: "100%",
    height: 220,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
