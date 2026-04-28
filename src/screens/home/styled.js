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
