import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f9;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
  color: #333;
  text-align: center;
`;
export const DivForm = styled.View`
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const LabelInterno = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #444;
`;

export const InputArea = styled.TextInput`
  background-color: #fff;
  border-width: 1px;
  border-color: #000;
  padding: 10px;
  height: 90px;
  text-align: top;
`;

export const SignatureContainer = styled.View`
  width: 100%;
  height: 220px;
  border-width: 1px;
  border-color: #000;
  background-color: #fff;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #28a745;
  padding: 18px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 30px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
