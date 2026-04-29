import { MaterialIcons } from "@expo/vector-icons";
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
              Checklist
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
          />
        )}

        {step === 2 && (
          <Step2
            formData={formData}
            handleInputChange={handleInputChange}
            refAssinaturaResponsavel={refAssinaturaResponsavel}
            refAssinaturaTecnico={refAssinaturaTecnico}
            setScrollEnabled={setScrollEnabled}
          />
        )}

        {step === 3 && <Step3 formData={formData} />}

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
              <HalfButtonText>Próximo</HalfButtonText>
            </HalfButton>
          )}
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
