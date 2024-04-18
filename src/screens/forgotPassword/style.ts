import styled from "styled-components/native";
import * as Animated from "react-native-animatable";

export const Container = styled.View`
  flex: 1;
`;
export const ContainerLogo = styled(Animated.View)`
  flex: 2;
  background-color: #28502e;
  justify-content: center;
  align-items: center;
`;

export const ContainerForm = styled(Animated.View)`
  margin-top: -20px;
  flex: 2;
  background-color: #fff;
  border-top-right-radius: 25px;
  align-items: center;
`;
export const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 12px;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: #c3c8cc;
  font-weight: bold;
`;

export const ButtonTextUrderline = styled.Text`
  margin-top: 12px;
  margin-bottom: 18px;
  color: #28502e;
  font-weight: bold;
  text-decoration: underline;
`;