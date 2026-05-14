import styled from "styled-components/native";
import {
  neutralColors,
  primaryColors,
  secondaryColors,
} from "../../utils/colors";

export const ContainerScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    //padding: 20,
    //paddingBottom: 40,
    //gap: 14,
  },
})`
  flex: 1;
  //background-color: ${neutralColors.n90};
`;

export const MainContainer = styled.View`
  flex: 1;
  padding: 20px;
  gap: 14px;
  background-color: ${neutralColors.n95};
`;

export const Container = styled.View`
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
`;

export const DivVisitaId = styled.View.attrs({
  borderBottomWidth: 1,
  borderBottomColor: neutralColors.n70,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const DivNomeDaUnidade = styled.View`
  align-items: self-start;
  gap: 6px;
  padding: 6px 0;
`;

export const BotaoEditarUnidade = styled.TouchableOpacity`
  background-color: ${primaryColors.primary};
  padding: 6px 12px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  gap: 6px;
`;

export const TituloDiv = styled.Text`
  font-family: "Poppins_500Medium";
  color: ${neutralColors.neutral};
  font-size: 16px;
`;

export const TextoUnidade = styled.Text`
  font-family: "Poppins_500Medium";
  color: ${primaryColors.primary};
  font-size: 16px;
`;
export const DivDataEHorario = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const DivData = styled.View`
  background-color: ${neutralColors.n95};
  border-radius: 8px;
  flex: 1;
  padding: 12px;
  border: 1px solid ${neutralColors.n70};
  gap: 6px;
`;

export const DivDataIcon = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const DivMotivoEServico = styled.View`
  margin-top: 14px;
`;

export const DivMotivoVisita = styled.View`
  background-color: ${neutralColors.n95};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${neutralColors.n70};
`;

export const DivEquipamentoESerial = styled.View`
  align-items: start;
  gap: 12px;
`;

export const DivIconEquipamento = styled.View``;

export const DivTituloEquipamento = styled.View`
  flex-direction: column;
  background-color: blue;
`;

export const TextoSituacao = styled.Text`
  padding: 6px 10px;

  background-color: ${(props) =>
    props.status === "Problema Resolvido"
      ? primaryColors.p90
      : secondaryColors.s95};
  border: 1px solid;

  border-color: ${(props) =>
    props.status === "Problema Resolvido"
      ? primaryColors.p70
      : secondaryColors.s70};

  border-radius: 20px;
  font-family: "Poppins_500Medium";

  color: ${(props) =>
    props.status === "Problema Resolvido"
      ? primaryColors.primary
      : secondaryColors.s50};
  align-self: flex-start;
`;

export const DivAssinatura = styled.View`
  border-radius: 8px;
  border: 1px solid ${neutralColors.n70};
  padding: 12px;
  gap: 14px;
`;

export const Assinatura = styled.View`
  align-items: center;
  border: dashed 1px ${neutralColors.n70};
  border-radius: 8px;
  background-color: ${neutralColors.n95};
`;

export const BotaoBaixarPDF = styled.TouchableOpacity`
  background-color: ${primaryColors.primary};
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
