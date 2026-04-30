import { View } from "react-native";
import { Container, DivIconInput, InputField, Label } from "./styled";
export default function FormInput({ label, icon, ...props }) {
  return (
    <Container>
      {icon && <View style={{ justifyContent: "center" }}>{icon}</View>}
      <DivIconInput>
        <Label>{label}</Label>
        <InputField {...props} />
      </DivIconInput>
    </Container>
  );
}
