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
      <Title>Novo Termdo ded Visita</Title>

      <DivForm>
        <FormSection>
          <FormTermoInput
            label="unidade visitada"
            value={formData.unidade}
            onChangeText={(t) => handleInputChange("unidade", t)}
            placeholder="Nome da Unidade"
          />
          {/* Removido o SignatureContainer daqui para o layout não quebrar */}
          <View style={{ flex: 1 }}>
            <FormTermoInput
              label="Horário de Chegada"
              value={formData.chegada}
              onChangeText={(t) => handleInputChange("chegada", t)}
              placeholder="08:00"
            />
          </View>
        </FormSection>

        <FormSection title="Motivo da visita *">
          <FormCheckbox
            label="Instalação de Equipamento"
            selected={formData.motivos.includes("Instalação de Equipamento")}
            onPress={() =>
              handleToggleArray("motivos", "Instalação de Equipamento")
            }
          />
          <FormCheckbox
            label="Manutenção Preventiva"
            selected={formData.motivos.includes("Manutenção Preventiva")}
            onPress={() =>
              handleToggleArray("motivos", "Manutenção Preventiva")
            }
          />
          <FormCheckbox
            label="Rede / Internet"
            selected={formData.motivos.includes("Rede / Internet")}
            onPress={() => handleToggleArray("motivos", "Rede / Internet")}
          />
        </FormSection>

        <FormSection
          styles={{ marginBottom: 40 }}
          title="Serviços realizados *"
        >
          <FormTermoInput
            label="Equipamento"
            value={formData.equipamento}
            onChangeText={(t) => handleInputChange("equipamento", t)}
            placeholder="Ex: Desktop, Impressora..."
          />
          <FormTermoInput
            label="Nº de série"
            value={formData.numeroSerie}
            onChangeText={(t) => handleInputChange("numeroSerie", t)}
          />
          <LabelInterno>Descrição do serviço</LabelInterno>
          <InputArea
            value={formData.servico}
            onChangeText={(t) => handleInputChange("servico", t)}
            placeholder="Descreva o que foi resolvido"
            multiline
          />
        </FormSection>

        <FormSection title="Situação final">
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
          <LabelInterno>Observações técnicas</LabelInterno>
          <InputArea
            value={formData.obsTecnicas}
            onChangeText={(t) => handleInputChange("obsTecnicas", t)}
            placeholder="Observações..."
            multiline
          />
        </FormSection>

        <FormSection title="Responsavel da unidade / Testemunha da visita">
          <FormTermoInput
            label="Nome do responsavel"
            value={formData.responsavelNome}
            onChangeText={(t) => handleInputChange("responsavelNome", t)}
          />
          <FormTermoInput
            label="Cargo / Função"
            value={formData.responsavelCargo}
            onChangeText={(t) => handleInputChange("responsavelCargo", t)}
          />
        </FormSection>

        <FormSection title="Assinatura: Responsável">
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
              backgroundColor="#ffffff"
              penColor="#000000"
              webStyle={`
                  html, body { 
                    width: 100%; 
                    height: 100%; 
                    margin: 0; 
                    padding: 0; 
                    background-color: #ffffff; 
                  }
                  .m-signature-pad { 
                    box-shadow: none; 
                    border: none; 
                    margin: 0; 
                    padding: 0; 
                    background-color: #ffffff; 
                  }
                  .m-signature-pad--body { 
                    bottom: 0px; /* ISSO MATA O ESPAÇAMENTO EM BRANCO NO FINAL */
                    border: none; 
                    background-color: #ffffff; 
                  }
                  .m-signature-pad--footer { 
                    display: none; 
                  }
                `}
            />
          </SignatureContainer>
        </FormSection>

        <FormSection title="Assinatura: Técnico TIC">
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
              backgroundColor="#ffffff"
              penColor="#000000"
              webStyle={`
                  html, body { 
                    width: 100%; 
                    height: 100%; 
                    margin: 0; 
                    padding: 0; 
                    background-color: #ffffff; 
                  }
                  .m-signature-pad { 
                    box-shadow: none; 
                    border: none; 
                    margin: 0; 
                    padding: 0; 
                    background-color: #ffffff; 
                  }
                  .m-signature-pad--body { 
                    bottom: 0px; /* ISSO MATA O ESPAÇAMENTO EM BRANCO NO FINAL */
                    border: none; 
                    background-color: #ffffff; 
                  }
                  .m-signature-pad--footer { 
                    display: none; 
                  }
                `}
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
