import styled from "styled-components/native";

const CheckContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

export const Box = styled.View`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background-color: ${(props) => (props.selected ? "#eee" : "#fff")};
`;

export const CheckText = styled.Text`
  font-size: 14px;
`;
