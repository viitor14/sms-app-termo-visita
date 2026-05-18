import styled from "styled-components/native";
import { neutralColors, primaryColors } from "../../utils/colors";

export const Container = styled.View`
  background-color: ${neutralColors.n95};
  align-items: center;
  padding-bottom: 24px;
  flex: 1;
`;

export const Header = styled.View`
  background-color: #fff;
  padding: 40px 14px 6px;
  width: 100%;
  justify-content: center;
`;

export const DivChamadosAbertos = styled.View`
  margin-top: 20px;
  width: 100%;
`;

export const DivBotoesActions = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  gap: 16px;
`;

export const BotaoAcao = styled.TouchableOpacity`
  flex: 1;
  background-color: ${primaryColors.p20};
  padding: 14px 24px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

export const TextoBotoes = styled.Text`
  font-size: 16px;
  font-family: "Poppins_500Medium";
  color: #fff;
  text-align: center;
`;
