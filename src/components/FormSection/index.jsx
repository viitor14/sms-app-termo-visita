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
        {title && <TitleSection>{title}</TitleSection>}
      </SectionHeader>

      <Content>{children}</Content>
    </SectionContainer>
  );
}
