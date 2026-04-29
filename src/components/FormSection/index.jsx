import { MaterialIcons } from "@expo/vector-icons";

import { primaryColors } from "../../utils/colors";

import {
  Content,
  SectionContainer,
  SectionHeader,
  TitleSection,
} from "./styled";

export default function FormSection({ title, children, icon }) {
  return (
    <SectionContainer>
      <SectionHeader>
        {icon && (
          <MaterialIcons name={icon} size={30} color={primaryColors.primary} />
        )}

        <TitleSection>{title}</TitleSection>
      </SectionHeader>

      <Content>{children}</Content>
    </SectionContainer>
  );
}
