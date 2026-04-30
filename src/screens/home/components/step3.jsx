import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Text, View } from "react-native";

import FormSection from "../../../components/FormSection";

import { primaryColors } from "@/src/utils/colors";
import {
  DivDetalhesVisita,
  DivIcon,
  DivInfoLugar,
  DivTitleDetalhes,
  NomeUnidade,
  ResumoLabel,
  ResumoText,
  TitleNomeUnidade,
} from "../styled";

export default function Step3({ formData }) {
  return (
    <FormSection>
      <View
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <DivDetalhesVisita>
          <DivIcon>
            <MaterialIcons
              name="place"
              size={18}
              color={primaryColors.primary}
            />
          </DivIcon>
          <DivTitleDetalhes>Informação da unidade</DivTitleDetalhes>
        </DivDetalhesVisita>
        <DivInfoLugar>
          <ResumoLabel>
            <TitleNomeUnidade>Unidade</TitleNomeUnidade>
            <NomeUnidade>{formData.unidade}</NomeUnidade>
          </ResumoLabel>
          <ResumoLabel>
            <TitleNomeUnidade>Data</TitleNomeUnidade>
            <NomeUnidade>{formData.data}</NomeUnidade>
          </ResumoLabel>
          <ResumoLabel>
            <TitleNomeUnidade>Horario de chegada</TitleNomeUnidade>
            <NomeUnidade>{formData.chegada}</NomeUnidade>
          </ResumoLabel>
          <ResumoLabel>
            <TitleNomeUnidade>
              Responsavel / Testemunha da unidade
            </TitleNomeUnidade>
            <NomeUnidade>{formData.responsavelNome}</NomeUnidade>
          </ResumoLabel>
        </DivInfoLugar>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <DivDetalhesVisita>
          <DivIcon>
            <MaterialIcons
              name="miscellaneous-services"
              size={18}
              color={primaryColors.primary}
            />
          </DivIcon>
          <DivTitleDetalhes>Serviço realizado</DivTitleDetalhes>
        </DivDetalhesVisita>
        <ResumoLabel>
          <TitleNomeUnidade>
            Responsavel / Testemunha da unidade
          </TitleNomeUnidade>
          <NomeUnidade>{formData.responsavelNome}</NomeUnidade>
        </ResumoLabel>
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
      </View>
    </FormSection>
  );
}
