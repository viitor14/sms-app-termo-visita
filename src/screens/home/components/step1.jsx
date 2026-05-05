import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { View } from "react-native";

import FormCheckbox from "../../../components/FormCheckbox";
import FormTermoInput from "../../../components/FormInput";
import FormSection from "../../../components/FormSection";

import { neutralColors } from "../../../utils/colors";

import {
  DivCheckBoxs,
  DivDescricaoServico,
  DivSituacaoFinal,
  DivTitleStep,
  InputArea,
  LabelInterno,
  SubTitle,
  TitleStep,
} from "../styled";

export default function Step1({
  formData,
  handleInputChange,
  handleToggleArray,
  title,
  subTitle,
}) {
  return (
    <>
      <DivTitleStep>
        <TitleStep>{title}</TitleStep>
        <SubTitle>{subTitle}</SubTitle>
      </DivTitleStep>
      <FormSection title="Unidade Visitada *">
        <FormTermoInput
          label="Nome da unidade"
          value={formData.unidade}
          onChangeText={(t) => handleInputChange("unidade", t)}
          placeholder="Nome da Unidade"
          icon={
            <FontAwesome6 name="user" size={18} color={neutralColors.neutral} />
          }
          placeholder="EX: USF 01 "
        />
        <FormTermoInput
          label="Horário de Chegada"
          value={formData.chegada}
          onChangeText={(t) => handleInputChange("chegada", t)}
          icon={
            <MaterialIcons
              name="access-time"
              size={18}
              color={neutralColors.neutral}
            />
          }
          placeholder="08:00"
        />
      </FormSection>

      <FormSection title="Motivo da visita *">
        <DivCheckBoxs>
          <FormCheckbox
            label="Manutenção Preventiva"
            selected={formData.motivos.includes("Manutenção Preventiva")}
            onPress={() =>
              handleToggleArray("motivos", "Manutenção Preventiva")
            }
          />
          <FormCheckbox
            label="Manutenção corretiva"
            selected={formData.motivos.includes("Manutenção corretiva")}
            onPress={() => handleToggleArray("motivos", "Manutenção corretiva")}
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

          <FormCheckbox
            label="Configuração de sistema"
            selected={formData.motivos.includes("Configuração de sistema")}
            onPress={() =>
              handleToggleArray("motivos", "Configuração de sistema")
            }
          />
          <FormCheckbox
            label="Impressoras"
            selected={formData.motivos.includes("Impressoras")}
            onPress={() => handleToggleArray("motivos", "Impressoras")}
          />
          <FormCheckbox
            label="Suporte ao usuário"
            selected={formData.motivos.includes("Suporte ao usuário")}
            onPress={() =>
              handleToggleArray("motivos", "ImpreSuporte ao usuáriossoras")
            }
          />
        </DivCheckBoxs>
      </FormSection>

      <FormSection title="Serviços realizados *">
        <FormTermoInput
          label="Equipamento"
          value={formData.equipamento}
          onChangeText={(t) => handleInputChange("equipamento", t)}
          placeholder="Ex: Desktop, Impressora..."
          icon={
            <MaterialCommunityIcons
              name="desktop-tower-monitor"
              size={18}
              color={neutralColors.neutral}
            />
          }
        />
        <FormTermoInput
          label="Nº de série"
          value={formData.numeroSerie}
          onChangeText={(t) => handleInputChange("numeroSerie", t)}
          icon={
            <MaterialCommunityIcons
              name="numeric"
              size={18}
              color={neutralColors.neutral}
            />
          }
          placeholder="Ex: PE01ABC4"
        />
        <DivDescricaoServico>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MaterialIcons
              name="description"
              size={20}
              color={neutralColors.neutral}
            />
            <LabelInterno>Descrição do serviço</LabelInterno>
          </View>
          <InputArea
            value={formData.servico}
            onChangeText={(t) => handleInputChange("servico", t)}
            placeholder="Descreva o que foi resolvido"
            multiline
          />
        </DivDescricaoServico>
      </FormSection>
      <FormSection title="Situação final *">
        <DivCheckBoxs>
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

          <FormCheckbox
            label="Necessita retorno técnico"
            selected={formData.situacao.includes("Necessita retorno técnico")}
            onPress={() =>
              handleToggleArray("situacao", "Necessita retorno técnico")
            }
          />
          <FormCheckbox
            label="Necessita troca de equipamento"
            selected={formData.situacao.includes(
              "Necessita troca de equipamento",
            )}
            onPress={() =>
              handleToggleArray("situacao", "Necessita troca de equipamento")
            }
          />
          <FormCheckbox
            label="Encaminhado para outro setor"
            selected={formData.situacao.includes(
              "Encaminhado para outro setor",
            )}
            onPress={() =>
              handleToggleArray("situacao", "Encaminhado para outro setor")
            }
          />
        </DivCheckBoxs>
        <DivDescricaoServico style={{ marginTop: 12 }}>
          <DivSituacaoFinal>
            <MaterialIcons
              name="description"
              size={20}
              color={neutralColors.neutral}
            />

            <LabelInterno>Observações técnicas</LabelInterno>
          </DivSituacaoFinal>
          <InputArea
            value={formData.obsTecnicas}
            onChangeText={(t) => handleInputChange("obsTecnicas", t)}
            placeholder="Observações..."
            multiline
          />
        </DivDescricaoServico>
      </FormSection>
    </>
  );
}
