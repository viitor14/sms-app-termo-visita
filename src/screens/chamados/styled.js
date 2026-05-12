import styled from "styled-components/native";
import {
  neutralColors,
  primaryColors,
  secondaryColors,
  tertiaryColors,
} from "../../utils/colors";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${neutralColors.n95};
`;

export const TextoTitulo = styled.Text`
  font-size: 24px;
  color: ${neutralColors.n10};
  font-family: "Poppins_700Bold";
  padding: 12px 0;
`;

export const TextoId = styled.Text`
  font-size: 14px;
  color: ${neutralColors.n70};
  font-family: "Poppins_500Medium";
`;

export const ChamadoContainer = styled.TouchableOpacity`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  gap: 10px;
`;
export const DivChegada = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const TextoHorarioChegada = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: "Poppins_400Regular";
  margin-top: 4px;
`;

export const TextoStatus = styled.Text`
  font-size: 16px;
  color: ${secondaryColors.secondary};
  font-family: "Poppins_700Bold";
`;

export const DivBotoes = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const BotaoContinuar = styled.TouchableOpacity`
  background-color: ${primaryColors.primary};
  padding: 6px 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 6px;
  width: 60%;
`;

export const BotaoExcluir = styled.TouchableOpacity`
  background-color: ${tertiaryColors.tertiary};
  padding: 6px 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  flex-direction: row;
  gap: 6px;
  width: 40%;
`;

export const TextoBotao = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: "Poppins_600SemiBold";
  margin-top: 4px;
`;
