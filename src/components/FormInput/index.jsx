import { View } from "react-native";
import { Container, DivIconInput, InputField, Label } from "./styled";
export default function FormInput({ label, icon, ...props }) {
  return (
    <Container>
      <Label>{label}</Label>
      <DivIconInput>
        {icon && (
          <View style={{ marginRight: 8, justifyContent: "center" }}>
            {icon}
          </View>
        )}
        <InputField {...props} />
      </DivIconInput>
    </Container>
  );
}
