import FormCheckbox from "../../../components/FormCheckbox";
import FormTermoInput from "../../../components/FormInput";
import FormSection from "../../../components/FormSection";
import { InputArea, LabelInterno } from "../styled";

export default function Step1({
  formData,
  handleInputChange,
  handleToggleArray,
}) {
  return (
    <>
      <FormSection>
        <FormTermoInput
          label="unidade visitada"
          value={formData.unidade}
          onChangeText={(t) => handleInputChange("unidade", t)}
          placeholder="Nome da Unidade"
        />
        <FormTermoInput
          label="Horário de Chegada"
          value={formData.chegada}
          onChangeText={(t) => handleInputChange("chegada", t)}
          placeholder="08:00"
        />
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
          onPress={() => handleToggleArray("motivos", "Manutenção Preventiva")}
        />
        <FormCheckbox
          label="Rede / Internet"
          selected={formData.motivos.includes("Rede / Internet")}
          onPress={() => handleToggleArray("motivos", "Rede / Internet")}
        />
      </FormSection>

      <FormSection styles={{ marginBottom: 40 }} title="Serviços realizados *">
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
    </>
  );
}
