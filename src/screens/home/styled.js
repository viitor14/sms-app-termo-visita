import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import styled from "styled-components/native";
import {
  neutralColors,
  primaryColors,
  secondaryColors,
  tertiaryColors,
} from "../../utils/colors";
export const Container = styled.ScrollView`
  flex: 1;
  padding: 6px;
  background-color: ${neutralColors.p90};
`;

export const DivNav = styled.View`
  flex-direction: row;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: "Poppins_600SemiBold";
  font-size: 22px;
  //font-weight: bold;
  color: #333;
  text-align: center;
`;

export const DivForm = styled.View`
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const LabelInterno = styled.Text`
  font-size: 14px;
  font-family: "Poppins_600SemiBold";

  color: ${primaryColors.primary};
  text-transform: capitalize;
  text-align: center;
`;

export const InputArea = styled.TextInput.attrs({
  textAlignVertical: "top",
  placeholderTextColor: neutralColors.n60,
})`
  border: 1px solid ${neutralColors.n90};
  border-radius: 6px;
  color: ${neutralColors.n20};
  margin-top: 4px;
  padding: 10px;
  height: 90px;
  text-align: top;
  font-family: "Poppins_400Regular";
`;

export const DivAssinatura = styled.View`
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`;

export const DivIconAndTitleAss = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 14px 0;
`;

export const IconDraw = styled(MaterialCommunityIcons).attrs({
  name: "draw",
})`
  color: ${primaryColors.primary};
`;

export const TitleAssinatura = styled.Text`
  font-family: "Poppins_500Medium";
  font-size: 20px;
`;

export const SignatureContainer = styled.View`
  width: 100%;
  height: 220px;
  border: 2px dashed ${neutralColors.n70};
  border-radius: 6px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #28a745;
  padding: 18px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 30px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const HalfButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.outline ? "transparent" : secondaryColors.secondary};
  border: ${(props) =>
    props.outline ? `2px solid ${primaryColors.primary}` : "none"};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  flex: 0.48;
`;

export const HalfButtonText = styled.Text`
  color: ${(props) =>
    props.outline ? primaryColors.primary : secondaryColors.s40};
  font-size: 16px;
  font-weight: bold;
`;

export const ResumoText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

export const ResumoLabel = styled.View`
  flex-direction: row;
`;

export const TextoNegrito = styled.Text`
  font-weight: bold;
  color: #333;
`;

export const BotaoLimpar = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background-color: ${tertiaryColors.tertiary};
  gap: 4px;
  border-radius: 6px;
  margin-top: 5px;
  padding: 6px;
`;

export const TextoBotaoLimpar = styled.Text`
  color: ${tertiaryColors.t90};
  font-size: 12px;
  font-family: "Poppins_600SemiBold";
`;

export const IconClear = styled(MaterialIcons).attrs({
  name: "clear",
})`
  color: ${tertiaryColors.t90};
`;

export const colors = {
  primary: "#002661", // Azul escuro da Prefeitura
  activeGlow: "rgba(0, 38, 97, 0.15)", // Halo de luz suave
  textDark: "#000000",
  textLight: "#808080",
  borderLight: "#D0D0D0",
};

export const StepperContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%; /* Ajuste conforme necessário para centralizar */
  align-self: center;
  margin-top: 15px;
  margin-bottom: 25px;
  position: relative; /* Importante para a linha de fundo */
`;

// A linha cinza que fica por trás de tudo conectando os passos
export const BackgroundLine = styled.View`
  position: absolute;
  top: 16px;
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: ${neutralColors.neutral};
  z-index: -1;
`;

export const StepItem = styled.View`
  align-items: center;
  width: 25%;
`;

export const StepCircle = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  border-width: 2px;

  /* Logica de cor do fundo */
  background-color: ${(props) =>
    props.completed || props.active ? primaryColors.primary : "#FFFFFF"};

  border-color: ${(props) =>
    props.completed || props.active
      ? primaryColors.primary
      : neutralColors.neutral};

  /* Efeito de Halo de Luz (apenas para o passo ativo) */
  ${(props) =>
    props.active &&
    `
    box-shadow: 0px 0px 8px ${primaryColors.p80};
    border-color: ${primaryColors.p80};
    border-width: 2px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
  `}
`;

export const StepNumber = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff; /* Texto branco dentro do círculo escuro */
`;

export const StepLabel = styled.Text`
  font-size: 11px;
  margin-top: 8px;
  text-align: center;
  font-family: "Poppins_500Medium";
  font-weight: ${(props) => (props.active || props.completed ? "600" : "500")};
  color: ${(props) =>
    props.active || props.completed
      ? primaryColors.primary
      : neutralColors.neutral};
`;

export const ActiveLine = styled.View`
  position: absolute;
  top: 16px; /* Mesma altura da BackgroundLine */
  left: 10%;
  height: 2px;
  background-color: ${primaryColors.primary}; /* Sua cor azul */
  z-index: -1;

  width: ${(props) => props.width || "0%"};
`;

export const DivTitleStep = styled.View`
  background-color: transparent;
`;

export const TitleStep = styled.Text`
  font-family: "Poppins_600SemiBold";
  font-size: 20px;
  color: #000;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${neutralColors.neutral};
  font-family: "Poppins_300Light";
`;

export const DivCheckBoxs = styled.View`
  border-radius: 16px;
  background-color: #fff;
  padding: 10px;
  gap: 6px;
`;

export const DivDescricaoServico = styled.View`
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
`;
