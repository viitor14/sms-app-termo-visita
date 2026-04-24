import {
  Content,
  SectionContainer,
  SectionHeader,
  SectionTitle,
} from "./styled";

export default function FormSection({ title, children }) {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <Content>{children}</Content>
    </SectionContainer>
  );
}
