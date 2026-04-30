import styled from "styled-components/native";
import { neutralColors, primaryColors } from "../../utils/colors";

export const Container = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
  background-color: #fff;
  padding: 12px 10px;
  border-radius: 20px;
  gap: 10px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${primaryColors.primary};
  text-transform: capitalize;
  font-family: "Poppins_600SemiBold";
`;

export const DivIconInput = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const InputField = styled.TextInput.attrs({
  underlineColorAndroid: "transparent",
})`
  background-color: #fff;
  font-size: 16px;
  color: ${neutralColors.n10};
  flex: 1;
  border: none;
  outline-width: 0;
  outline: none;
  padding: 2px;
  font-family: "Poppins_300Light";
`;
