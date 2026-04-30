import styled from "styled-components/native";
import { neutralColors } from "../../utils/colors";

export const SectionContainer = styled.View`
  border-radius: 8px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const SectionTitle = styled.Text`
  font-size: 12px;
  color: ${neutralColors.n20};
  font-weight: 400;
  text-transform: capitalize;
`;

export const Content = styled.View``;

export const TitleSection = styled.Text`
  font-family: "Poppins_600SemiBold";
  font-size: 16px;
`;
