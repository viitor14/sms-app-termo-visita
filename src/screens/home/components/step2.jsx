import SignatureScreen from "react-native-signature-canvas";
import FormTermoInput from "../../../components/FormInput";
import FormSection from "../../../components/FormSection";

export const Step2 = ({
  formData,
  handleInputChange,
  setScrollEnabled,
  refAssinaturaResponsavel,
  refAssinaturaTecnico,
}) => {
  return (
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
            onOK={(img) => handleInputChange("imgAssinaturaResponsavel", img)}
            onEmpty={() => handleInputChange("imgAssinaturaResponsavel", null)}
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
            onEmpty={() => handleInputChange("imgAssinaturaTecnico", null)}
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
  );
};
