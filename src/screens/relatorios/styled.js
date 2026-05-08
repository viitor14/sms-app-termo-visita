import styled from "styled-components/native";
import { neutralColors } from "../../utils/colors";

export const CardRelatorio = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const UnidadeNome = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const QuantidadeVisitas = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #2ecc71; /* Um verde para indicar produtividade */
`;

export const Container = styled.View`
  flex: 1;
  padding: 6px;
  background-color: ${neutralColors.p90};
`;

export const Titulo = styled.Text`
  font-family: "Poppins_600SemiBold";
`;
