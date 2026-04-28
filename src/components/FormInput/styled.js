import styled from "styled-components/native";
import { neutralColors } from "../../utils/colors";

export const Container = styled.View`
  margin-bottom: 12px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${neutralColors.n20};
  text-transform: capitalize;
  margin-bottom: 4px;
`;

export const InputField = styled.TextInput`
  border: 2px solid ${neutralColors.n90};
  border-radius: 6px;
  padding: 8px;
  background-color: #fff;
  font-size: 16px;
  color: ${neutralColors.n10};
`;
