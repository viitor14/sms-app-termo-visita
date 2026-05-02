import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { View } from "react-native";

import FormSection from "../../../components/FormSection";

import { primaryColors } from "@/src/utils/colors";
import {
  DivDetalhesVisita,
  DivIcon,
  DivInfoLugar,
  DivTitleDetalhes,
  DivTitleStep,
  NomeUnidade,
  ResumoLabel,
  SubTitle,
  TitleNomeUnidade,
} from "../styled";

export default function Step3({ formData, subTitle }) {
  return (
    <>
      <DivTitleStep>
        <SubTitle>{subTitle}</SubTitle>
      </DivTitleStep>

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
          <DivInfoLugar>
            <ResumoLabel>
              <TitleNomeUnidade>
                Responsavel / Testemunha da unidade
              </TitleNomeUnidade>
              <NomeUnidade>
                {formData.responsavelNome} {`(${formData.responsavelCargo})`}
              </NomeUnidade>
            </ResumoLabel>
            <ResumoLabel>
              <TitleNomeUnidade>Técnico</TitleNomeUnidade>
              <NomeUnidade>{formData.tecnico}</NomeUnidade>
            </ResumoLabel>
            <ResumoLabel>
              <TitleNomeUnidade>Equipamento</TitleNomeUnidade>
              <NomeUnidade>{formData.equipamento}</NomeUnidade>
            </ResumoLabel>
            <ResumoLabel>
              <TitleNomeUnidade>Serviço</TitleNomeUnidade>
              <NomeUnidade>{formData.servico}</NomeUnidade>
            </ResumoLabel>
            <ResumoLabel>
              <TitleNomeUnidade>Situação</TitleNomeUnidade>
              <NomeUnidade>{formData.situacao.join(", ")}</NomeUnidade>
            </ResumoLabel>
            <ResumoLabel>
              <TitleNomeUnidade>Oberservações</TitleNomeUnidade>
              <NomeUnidade>{formData.obsTecnicas}</NomeUnidade>
            </ResumoLabel>
          </DivInfoLugar>
        </View>
      </FormSection>
    </>
  );
}
