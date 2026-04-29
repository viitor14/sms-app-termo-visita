import styled from "styled-components/native";
import { neutralColors } from "../../utils/colors";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: ${neutralColors.p90};
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
  color: #333;
  text-align: center;
`;
export const DivForm = styled.View`
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const LabelInterno = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${neutralColors.n20};
  text-transform: capitalize;
`;

export const InputArea = styled.TextInput.attrs({
  textAlignVertical: "top",
  placeholderTextColor: neutralColors.n60,
})`
  border: 2px solid ${neutralColors.n90};
  border-radius: 6px;
  color: ${neutralColors.n20};
  margin-top: 4px;
  padding: 10px;
  height: 90px;
  text-align: top;
`;

export const SignatureContainer = styled.View`
  width: 100%;
  height: 220px;
  border: 2px solid ${neutralColors.n90};
  border-radius: 6px;
  background-color: #fff;
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

// Adicione isso no seu styled.js
export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
`;

// Um botão que ocupa quase metade da tela para ficar lado a lado
export const HalfButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.outline ? "transparent" : "#003FA3"}; /* Use sua cor primária aqui */
  border: ${(props) => (props.outline ? "2px solid #003FA3" : "none")};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  flex: 0.48; /* Ocupa 48% da linha */
`;

export const HalfButtonText = styled.Text`
  color: ${(props) => (props.outline ? "#003FA3" : "#fff")};
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
