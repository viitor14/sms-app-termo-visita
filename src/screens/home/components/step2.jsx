import SignatureScreen from "react-native-signature-canvas";

import FormTermoInput from "../../../components/FormInput";
import FormSection from "../../../components/FormSection";

import { neutralColors } from "../../../utils/colors";

import {
  BotaoLimpar,
  DivAssinatura,
  DivIconAndTitleAss,
  DivTitleStep,
  IconClear,
  IconDraw,
  SignatureContainer,
  SubTitle,
  TextoBotaoLimpar,
  TitleAssinatura,
  TitleStep,
} from "../styled";

export default function Step2({
  formData,
  handleInputChange,
  refAssinaturaResponsavel,
  refAssinaturaTecnico,
  setScrollEnabled,
}) {
  return (
    <>
      <DivTitleStep>
        <TitleStep>Assinatura Digital</TitleStep>
        <SubTitle>
          Peça assinatura do responsável/testemunha para concluir o termo.
        </SubTitle>
      </DivTitleStep>

      <DivAssinatura>
        <DivIconAndTitleAss>
          <IconDraw size={28} />
          <TitleAssinatura>
            Assinatura do responsavel/testemunha
          </TitleAssinatura>
        </DivIconAndTitleAss>
        <SignatureContainer>
          <SignatureScreen
            ref={refAssinaturaResponsavel}
            onOK={(img) => handleInputChange("imgAssinaturaResponsavel", img)}
            onEmpty={() => handleInputChange("imgAssinaturaResponsavel", null)}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            descriptionText="Assinatura do Responsável"
            backgroundColor={neutralColors.n95}
            penColor="#000000"
            webStyle={`html, body { width: 100%; height: 100%; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad { box-shadow: none; border: none; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad--body { bottom: 0px; border: none; background-color: ${neutralColors.n95}; } .m-signature-pad--footer { display: none; }`}
          />
        </SignatureContainer>

        <BotaoLimpar
          onPress={() => refAssinaturaResponsavel.current?.clearSignature()}
        >
          <IconClear size={20} />
          <TextoBotaoLimpar>Limpar</TextoBotaoLimpar>
        </BotaoLimpar>
      </DivAssinatura>

      <FormSection>
        <FormTermoInput
          label="Nome do responsável"
          value={formData.responsavelNome}
          onChangeText={(t) => handleInputChange("responsavelNome", t)}
        />
        <FormTermoInput
          label="Cargo / Função"
          value={formData.responsavelCargo}
          onChangeText={(t) => handleInputChange("responsavelCargo", t)}
        />
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
            onEmpty={() => handleInputChange("imgAssinaturaTecnico", null)}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            descriptionText="Assinatura do Técnico"
            backgroundColor={neutralColors.n95}
            penColor="#000000"
            webStyle={`html, body { width: 100%; height: 100%; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad { box-shadow: none; border: none; margin: 0; padding: 0; background-color: #ffffff; } .m-signature-pad--body { bottom: 0px; border: none; background-color: ${neutralColors.n95}} .m-signature-pad--footer { display: none; }`}
          />
        </SignatureContainer>

        <BotaoLimpar
          onPress={() => refAssinaturaTecnico.current?.clearSignature()}
        >
          <IconClear size={20} />
          <TextoBotaoLimpar>Limpar</TextoBotaoLimpar>
        </BotaoLimpar>
      </FormSection>
    </>
  );
}
