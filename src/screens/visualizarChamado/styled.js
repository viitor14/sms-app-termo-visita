import styled from "styled-components/native";
import { neutralColors, primaryColors } from "../../utils/colors";

export const ContainerScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 10,
    paddingBottom: 40,
    gap: 14,
  },
})`
  flex: 1;
  background-color: ${neutralColors.n90};
`;

export const Container = styled.View`
  background-color: #fff;
  padding: 8px 16px;
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
  background-color: ${neutralColors.n90};
  border-radius: 8px;
  flex: 1;
  padding: 12px;
  border: 1px solid ${neutralColors.n70};
  gap: 6px;
`;
