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
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 25px;
  padding-left: 10px;
`;
export const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-top: 45px;
  margin-bottom: 12px;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: #c3c8cc;
  font-weight: bold;
`;
