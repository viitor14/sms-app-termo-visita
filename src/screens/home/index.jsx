import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { gerarTermoPDF } from "../../utils/pdfGenerator";

import FormCheckbox from "../../components/FormCheckbox";
import FormTermoInput from "../../components/FormInput";
import FormSection from "../../components/FormSection";

import {
  Button,
  ButtonText,
  Container,
  DivForm,
  InputArea,
  LabelInterno,
  Row,
  SignatureContainer,
  Title,
} from "./styled";

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
    imgAssinaturaResponsavel: null,
    imgAssinaturaTecnico: null,
    imgAssinaturaTestemunha: null,
  });

  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const refAssinaturaResponsavel = useRef();
  const refAssinaturaTecnico = useRef();
  const refAssinaturaTestemunha = useRef();

  const handleInputChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

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

    refAssinaturaResponsavel.current?.readSignature();
    refAssinaturaTecnico.current?.readSignature();
    refAssinaturaTestemunha.current?.readSignature();

    setTimeout(() => {
      gerarTermoPDF(formDataRef.current);
    }, 1500);
  };

  return (
    <Container scrollEnabled={scrollEnabled}>
      <Title>Novo Termo de Visita</Title>

      <DivForm>
        <FormSection title="1. IDENTIFICAÇÃO DA UNIDADE">
          <FormTermoInput
            label="UNIDADE VISITADA"
            value={formData.unidade}
            onChangeText={(t) => handleInputChange("unidade", t)}
            placeholder="Nome da Unidade"
          />
          <Row>
            {/* Removido o SignatureContainer daqui para o layout não quebrar */}
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
          </Row>
        </FormSection>

        <FormSection title="2. MOTIVO DA VISITA">
          <FormCheckbox
            label="Manutenção Preventiva"
            selected={formData.motivos.includes("Manutenção Preventiva")}
            onPress={() =>
              handleToggleArray("motivos", "Manutenção Preventiva")
            }
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
          <LabelInterno>DESCRIÇÃO DO SERVIÇO</LabelInterno>
          <InputArea
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
          <LabelInterno>OBSERVAÇÕES TÉCNICAS</LabelInterno>
          <InputArea
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
          <SignatureContainer>
            <SignatureScreen
              ref={refAssinaturaResponsavel}
              onOK={(img) => handleInputChange("imgAssinaturaResponsavel", img)}
              onEmpty={() =>
                handleInputChange("imgAssinaturaResponsavel", null)
              }
              onBegin={() => setScrollEnabled(false)}
              onEnd={() => setScrollEnabled(true)}
              descriptionText="Assinatura do Responsável"
              webStyle={`.m-signature-pad--footer { display: none; } body,html { height: 180px; }`}
            />
          </SignatureContainer>
        </FormSection>

        <FormSection title="ASSINATURA: TÉCNICO DE TIC">
          {/* Corrigido aqui: Usando LabelInterno em vez de style inexistente */}
          <LabelInterno>Técnico: {formData.tecnico}</LabelInterno>
          <SignatureContainer>
            <SignatureScreen
              ref={refAssinaturaTecnico}
              onOK={(img) => handleInputChange("imgAssinaturaTecnico", img)}
              onEmpty={() => handleInputChange("imgAssinaturaTecnico", null)}
              onBegin={() => setScrollEnabled(false)}
              onEnd={() => setScrollEnabled(true)}
              descriptionText="Assinatura do Técnico"
              webStyle={`.m-signature-pad--footer { display: none; } body,html { height: 180px; }`}
            />
          </SignatureContainer>
        </FormSection>

        <FormSection title="ASSINATURA: TESTEMUNHA">
          <FormTermoInput
            label="NOME DA TESTEMUNHA"
            value={formData.testemunhaNome}
            onChangeText={(t) => handleInputChange("testemunhaNome", t)}
          />
          <SignatureContainer>
            <SignatureScreen
              ref={refAssinaturaTestemunha}
              onOK={(img) => handleInputChange("imgAssinaturaTestemunha", img)}
              onEmpty={() => handleInputChange("imgAssinaturaTestemunha", null)}
              onBegin={() => setScrollEnabled(false)}
              onEnd={() => setScrollEnabled(true)}
              descriptionText="Assinatura da Testemunha"
              webStyle={`.m-signature-pad--footer { display: none; } body,html { height: 180px; }`}
            />
          </SignatureContainer>
        </FormSection>

        <Button onPress={handleFinalizar}>
          <ButtonText>Gerar e Enviar Termo PDF</ButtonText>
        </Button>
      </DivForm>
    </Container>
  );
}
