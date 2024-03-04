import styled from "styled-components/native";

export const Box = styled.View`
  width: 80%;
  margin: 4px;
  height: 100px;
`;

export const TextInput = styled.TextInput<{ $colorBorderType: boolean }>`
  background:#B9D497;
  padding: 0 10px;
  color: #000;
  border: ${({ $colorBorderType }) =>
    $colorBorderType ? "1px solid red" : "1px solid #c3c8cc"};
  border-radius: 4px;
  height: 56px;
  width: 100%;
`;

export const Text = styled.Text<{ size?: string; colorType?: boolean }>`
  font-size: ${({ size }) => size || "24px"};
  color: ${({ colorType }) => (colorType ? "red" : "#000")};
  text-align: center;
  padding: 6px;
`;
export const BoxPassword = styled.View`
  width: 80%;
  margin: 4px;
  height: 100px;
  position: "relative";
  /* flex-direction: row;
  align-items: center; */
  /* flexDirection: 'row';
  borderBottomWidth: 1;
   borderBottomColor: '#000';
  alignItems: 'center'  */
`;
