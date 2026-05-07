import styled from "styled-components/native";
import { secondaryColors } from "../../utils/colors";

export const Container = styled.ScrollView`
  flex: 1;
`;

export const TextStatus = styled.Text`
  font-size: 14px;
  color: ${secondaryColors.secondary};
  font-family: "Poppins_600SemiBold";
`;
