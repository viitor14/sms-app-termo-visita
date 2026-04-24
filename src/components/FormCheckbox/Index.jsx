import { Box, CheckContainer, CheckText } from "./styled";

export default function FormCheckbox({ label, selected, onPress }) {
  return (
    <CheckContainer onPress={onPress} activeOpacity={0.7}>
      <Box selected={selected}>{selected && <CheckText>X</CheckText>}</Box>
      <CheckText>{label}</CheckText>
    </CheckContainer>
  );
}
