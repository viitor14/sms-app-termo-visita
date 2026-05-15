import styled from "styled-components/native";
import { neutralColors, primaryColors } from "../../utils/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${neutralColors.n95};
  padding: 14px 20px;
`;

export const TextoFiltrarUnidade = styled.Text`
  font-size: 18px;
  font-family: "Poppins_600SemiBold";
  margin-bottom: 6px;
`;

export const BotaoListaUnidades = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${neutralColors.n70};
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
`;

export const TextoNomeUnidade = styled.Text`
  font-size: 16px;
  color: ${primaryColors.primary};
  font-family: "Poppins_700Bold";
`;

export const ListaUnidadesAberta = styled.View.attrs({
  // Injetamos a sombra nativa direto aqui pelo attrs!
  style: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
})`
  background-color: #fff;
  border: 1px solid ${neutralColors.n70};
  border-radius: 8px;
  max-height: 200px;
  margin-top: 10px;
`;

export const BotaoItemDropdown = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 8px;
  border-bottom-color: ${neutralColors.n70};

  border-bottom-width: ${(props) => (props.isLastItem ? "0px" : "1px")};

  background-color: ${(props) =>
    props.isSelected ? neutralColors.n95 : "#fff"};
`;

export const TextoItemDropdown = styled.Text`
  font-size: 16px;

  /* Recebe a prop "isSelected" para mudar cor e peso da fonte */
  color: ${(props) => (props.isSelected ? "#000" : neutralColors.neutral)};
  font-family: ${(props) =>
    props.isSelected ? "Poppins_600SemiBold" : "Poppins_500Medium"};
`;

export const DivVisitas = styled.View`
  background-color: #fff;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  flex: 1;
`;

export const DivNomeUnidade = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  border-bottom: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${neutralColors.n70};
  flex-direction: row;
  gap: 10px;
`;

export const NomeUnidade = styled.Text`
  font-family: "Poppins_700Bold";
  color: ${primaryColors.p30};
  font-size: 18px;
  margin-top: 4px;
`;

export const DivDataEHora = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin-top: 10px;
`;

export const BotaoVisualizarTermo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  justify-content: space-between;
  gap: 14px;
`;

export const DivIconView = styled.View`
  background-color: ${primaryColors.p90};
  padding: 10px;
  border-radius: 50px;
`;
