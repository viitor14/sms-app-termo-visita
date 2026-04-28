import { MaterialIcons } from "@expo/vector-icons";
import { Box, CheckContainer, CheckText } from "./styled";

export default function FormCheckbox({ label, selected, onPress }) {
  return (
    <CheckContainer onPress={onPress} activeOpacity={0.7}>
      <Box selected={selected}>
        {selected && <MaterialIcons name="check" size={16} color="#fff" />}
      </Box>
      <CheckText>{label}</CheckText>
    </CheckContainer>
  );
}
