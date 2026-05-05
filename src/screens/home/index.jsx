import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { gerarTermoPDF } from "../../utils/pdfGenerator";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";

import {
  ActiveLine,
  BackgroundLine,
  ButtonRow,
  Container,
  DivForm,
  DivNav,
  HalfButton,
  HalfButtonText,
  StepCircle,
  StepItem,
  StepLabel,
  StepNumber,
  StepperContainer,
} from "./styled";

export default function Home() {
  const params = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    unidade: "",
    data: new Date().toLocaleDateString("pt-BR"),
    chegada: params.horaChegada,
    saida: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    matricula: "",
    tecnico: "",
    motivos: [],
    equipamento: "",
    numeroSerie: "",
    servico: "",
    situacao: [],
    obsTecnicas: "",
    responsavelNome: "",
    responsavelCargo: "",
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
    const saidaAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updatedFormData = { ...formDataRef.current, saida: saidaAtual };
    setFormData(updatedFormData);
    formDataRef.current = updatedFormData;

    gerarTermoPDF(updatedFormData);
  };

  return (
    <Container scrollEnabled={scrollEnabled}>
      <DivNav>
        <StepperContainer>
          <BackgroundLine />
          <ActiveLine width={step === 1 ? "0%" : step === 2 ? "40%" : "80%"} />

          <StepItem>
            <StepCircle completed={step > 1} active={step === 1}>
              {step > 1 ? (
                <MaterialIcons name="check" size={18} color="#FFFFFF" />
              ) : (
                <StepNumber>1</StepNumber>
              )}
            </StepCircle>
            <StepLabel completed={step > 1} active={step === 1}>
              Detalhes
            </StepLabel>
          </StepItem>

          <StepItem>
            <StepCircle completed={step > 2} active={step === 2}>
              {step > 2 ? (
                <MaterialIcons name="check" size={18} color="#FFFFFF" />
              ) : (
                <StepNumber>2</StepNumber>
              )}
            </StepCircle>
            <StepLabel completed={step > 2} active={step === 2}>
              Assinatura
            </StepLabel>
          </StepItem>

          <StepItem>
            <StepCircle completed={step > 3} active={step === 3}>
              {step > 3 ? (
                <MaterialIcons name="check" size={18} color="#FFFFFF" />
              ) : (
                <StepNumber>3</StepNumber>
              )}
            </StepCircle>
            <StepLabel completed={step > 3} active={step === 3}>
              Revisão
            </StepLabel>
          </StepItem>
        </StepperContainer>
      </DivNav>

      <DivForm>
        {step === 1 && (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            handleToggleArray={handleToggleArray}
            title="Informação da visita"
            subTitle="Descreva com mais detalhes sobre informação da visita"
          />
        )}

        {step === 2 && (
          <Step2
            formData={formData}
            handleInputChange={handleInputChange}
            refAssinaturaResponsavel={refAssinaturaResponsavel}
            refAssinaturaTecnico={refAssinaturaTecnico}
            setScrollEnabled={setScrollEnabled}
            title="Assinatura Digital"
            subTitle="Peça assinatura do responsável/testemunha para concluir o termo."
          />
        )}

        {step === 3 && (
          <Step3
            formData={formData}
            subTitle="Por favor, revise atentamente todos os dados coletados antes de confirmar a geração do termo de visita."
          />
        )}

        <ButtonRow>
          {step > 1 ? (
            <HalfButton outline onPress={handlePrevStep}>
              <HalfButtonText outline>Voltar</HalfButtonText>
            </HalfButton>
          ) : (
            <View style={{ flex: 0.48 }} />
          )}
          {step < 3 && (
            <HalfButton onPress={handleNextStep}>
              <HalfButtonText>Próxima Etapa</HalfButtonText>
            </HalfButton>
          )}
          {step === 3 && (
            <HalfButton onPress={handleFinalizar}>
              <HalfButtonText>Baixar Termo</HalfButtonText>
            </HalfButton>
          )}
        </ButtonRow>
      </DivForm>
    </Container>
  );
}
