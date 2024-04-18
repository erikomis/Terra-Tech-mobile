import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const ButtonBase = styled(TouchableOpacity)`
  background-color: #28502e;
  margin: 6px;

  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;
export const BoxButton = styled.View`
  width: 80%;
  margin: 6px;
  height: 100px;
  flex-direction: column;
`;
export const Text = styled.Text<{ size?: string; colorType?: boolean }>`
  font-size: ${({ size }) => size || "24px"};
  color: ${({ colorType }) => (colorType ? "red" : "#000")};
  text-align: center;
  padding: 6px;
`;
