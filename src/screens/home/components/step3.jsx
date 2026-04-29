import { Text } from "react-native";

import FormSection from "../../../components/FormSection";

import { ResumoLabel, ResumoText, TextoNegrito } from "../styled";

export default function Step3({ formData }) {
  return (
    <FormSection title="Resumo do Chamado">
      <ResumoLabel>
        <Text style={{ fontWeight: "bold" }}>Unidade:</Text>
        <TextoNegrito>{formData.unidade}</TextoNegrito>
      </ResumoLabel>
      <ResumoText>
        <Text style={{ fontWeight: "bold" }}>Técnico:</Text> {formData.tecnico}
      </ResumoText>
      <ResumoText>
        <Text style={{ fontWeight: "bold" }}>Equipamento:</Text>{" "}
        {formData.equipamento}
      </ResumoText>
      <ResumoText>
        <Text style={{ fontWeight: "bold" }}>Serviço:</Text> {formData.servico}
      </ResumoText>
      <ResumoText>
        <Text style={{ fontWeight: "bold" }}>Situação:</Text>{" "}
        {formData.situacao.join(", ")}
      </ResumoText>
      <ResumoText>
        <Text style={{ fontWeight: "bold" }}>Responsável Local:</Text>{" "}
        {formData.responsavelNome}
      </ResumoText>
    </FormSection>
  );
}
