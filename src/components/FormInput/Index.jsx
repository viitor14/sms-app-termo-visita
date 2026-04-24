import { Container, InputField, Label } from "./styled";

export default function FormInput({ label, ...props }) {
  return (
    <Container>
      <Label>{label}</Label>
      <InputField {...props} />
    </Container>
  );
}
