import styled from "styled-components/native";
import { neutralColors, primaryColors } from "../../utils/colors";

export const CheckContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

export const Box = styled.View`
  width: 24px;
  height: 24px;
  border-width: 1px;
  border-radius: 6px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;

  border-color: ${(props) =>
    props.selected ? primaryColors.primary : neutralColors.neutral};
  background-color: ${(props) =>
    props.selected ? primaryColors.primary : "transparent"};
`;

export const CheckText = styled.Text`
  font-size: 14px;
  flex: 1;
`;
