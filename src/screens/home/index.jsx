import { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { gerarTermoPDF } from "../../utils/pdfGenerator";

import FormCheckbox from "../../components/FormCheckbox";
import FormTermoInput from "../../components/FormInput";
import FormSection from "../../components/FormSection";

import {
  ButtonRow,
  Container,
  DivForm,
  HalfButton,
  HalfButtonText,
  InputArea,
  LabelInterno,
  ResumoText,
  SignatureContainer,
  Title,
} from "./styled";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    unidade: "",
    data: new Date().toLocaleDateString("pt-BR"),
    chegada: "",
    saida: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    matricula: "",
    tecnico: "",
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
  });

  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const refAssinaturaResponsavel = useRef();
  const refAssinaturaTecnico = useRef();

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

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.unidade || !formData.servico) {
        Alert.alert(
          "Atenção",
          "Preencha a unidade e o serviço antes de avançar.",
        );
        return;
      }
      setStep(2);
    } else if (step === 2) {
      refAssinaturaResponsavel.current?.readSignature();
      refAssinaturaTecnico.current?.readSignature();

      setTimeout(() => {
        setStep(3);
      }, 1000);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleFinalizar = () => {
    gerarTermoPDF(formDataRef.current);
  };

  return (
    <Container scrollEnabled={scrollEnabled}>
      {/* O Título muda conforme o passo */}
      <Title>
        {step === 1 && "Passo 1: Dados da Visita"}
        {step === 2 && "Passo 2: Dados das Assinaturas"}
        {step === 3 && "Passo 3: Revisão e Envio"}
      </Title>

      <DivForm>
        {/* ==========================================
            PASSO 1: INFORMAÇÕES DO CHAMADO
            ========================================== */}
        {step === 1 && (
          <>
            <FormSection>
              <FormTermoInput
                label="unidade visitada"
                value={formData.unidade}
                onChangeText={(t) => handleInputChange("unidade", t)}
                placeholder="Nome da Unidade"
              />
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
                selected={formData.motivos.includes(
                  "Instalação de Equipamento",
                )}
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
                onPress={() =>
                  handleToggleArray("situacao", "Problema Resolvido")
                }
              />
              <FormCheckbox
                label="Necessita Retorno"
                selected={formData.situacao.includes("Necessita Retorno")}
                onPress={() =>
                  handleToggleArray("situacao", "Necessita Retorno")
                }
              />
              <LabelInterno>Observações técnicas</LabelInterno>
              <InputArea
                value={formData.obsTecnicas}
                onChangeText={(t) => handleInputChange("obsTecnicas", t)}
                placeholder="Observações..."
                multiline
              />
            </FormSection>
          </>
        )}

        {step === 2 && (
          <>
            <FormSection title="Responsavel da unidade">
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
              <SignatureContainer>
                <SignatureScreen
                  ref={refAssinaturaResponsavel}
                  onOK={(img) =>
                    handleInputChange("imgAssinaturaResponsavel", img)
                  }
                  onEmpty={() =>
                    handleInputChange("imgAssinaturaResponsavel", null)
                  }
                  onBegin={() => setScrollEnabled(false)}
                  onEnd={() => setScrollEnabled(true)}
                  descriptionText="Assinatura do Responsável"
                  backgroundColor="#ffffff"
                  penColor="#000000"
                  webStyle={`html, body { width: 100%; height: 100%; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad { box-shadow: none; border: none; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad--body { bottom: 0px; border: none; background-color: #ffffff; } .m-signature-pad--footer { display: none; }`}
                />
              </SignatureContainer>
            </FormSection>

            <FormSection title="Técnico TIC">
              <FormTermoInput
                label="Nome do Técnico"
                value={formData.tecnico}
                onChangeText={(t) => handleInputChange("tecnico", t)}
              />
              <FormTermoInput
                label="Matrícula"
                value={formData.matricula}
                onChangeText={(t) => handleInputChange("matricula", t)}
              />
              <SignatureContainer>
                <SignatureScreen
                  ref={refAssinaturaTecnico}
                  onOK={(img) => handleInputChange("imgAssinaturaTecnico", img)}
                  onEmpty={() =>
                    handleInputChange("imgAssinaturaTecnico", null)
                  }
                  onBegin={() => setScrollEnabled(false)}
                  onEnd={() => setScrollEnabled(true)}
                  descriptionText="Assinatura do Técnico"
                  backgroundColor="#ffffff"
                  penColor="#000000"
                  webStyle={`html, body { width: 100%; height: 100%; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad { box-shadow: none; border: none; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad--body { bottom: 0px; border: none; background-color: #ffffff; } .m-signature-pad--footer { display: none; }`}
                />
              </SignatureContainer>
            </FormSection>
          </>
        )}

        {step === 3 && (
          <FormSection title="Resumo do Chamado">
            <ResumoText>
              <Text style={{ fontWeight: "bold" }}>Unidade:</Text>{" "}
              {formData.unidade}
            </ResumoText>
            <ResumoText>
              <Text style={{ fontWeight: "bold" }}>Técnico:</Text>{" "}
              {formData.tecnico}
            </ResumoText>
            <ResumoText>
              <Text style={{ fontWeight: "bold" }}>Equipamento:</Text>{" "}
              {formData.equipamento}
            </ResumoText>
            <ResumoText>
              <Text style={{ fontWeight: "bold" }}>Serviço:</Text>{" "}
              {formData.servico}
            </ResumoText>
            <ResumoText>
              <Text style={{ fontWeight: "bold" }}>Situação:</Text>{" "}
              {formData.situacao.join(", ")}
            </ResumoText>
            <ResumoText>
              <Text style={{ fontWeight: "bold" }}>Responsável Local:</Text>{" "}
              {formData.responsavelNome}
            </ResumoText>

            <LabelInterno style={{ marginTop: 20 }}>
              Tudo certo? As assinaturas já foram coletadas.
            </LabelInterno>
          </FormSection>
        )}

        {/* ==========================================
            BOTÕES DE NAVEGAÇÃO
            ========================================== */}
        <ButtonRow>
          {/* O botão VOLTAR só aparece no passo 2 e 3 */}
          {step > 1 ? (
            <HalfButton outline onPress={handlePrevStep}>
              <HalfButtonText outline>Voltar</HalfButtonText>
            </HalfButton>
          ) : (
            <View style={{ flex: 0.48 }} />
          )}{" "}
          {/* Placeholder para empurrar o "Próximo" pra direita no passo 1 */}
          {/* O botão PRÓXIMO só aparece no passo 1 e 2 */}
          {step < 3 && (
            <HalfButton onPress={handleNextStep}>
              <HalfButtonText>Próximo</HalfButtonText>
            </HalfButton>
          )}
          {/* O botão FINALIZAR só aparece no passo 3 */}
          {step === 3 && (
            <HalfButton
              onPress={handleFinalizar}
              style={{ backgroundColor: "#28a745" }}
            >
              <HalfButtonText>Finalizar e Gerar PDF</HalfButtonText>
            </HalfButton>
          )}
        </ButtonRow>
      </DivForm>
    </Container>
  );
}
