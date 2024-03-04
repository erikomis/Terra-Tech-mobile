import styled from "styled-components/native";
import * as Animated from "react-native-animatable";
import { TouchableOpacity } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerHeader = styled(Animated.View)`
  height: 20%;
  width: 100%;
  background-color: #28502e;
`;
export const FormContainer = styled(Animated.View)`
  flex: 1;
  width: 100%;
  background-color: white;
  align-items: center;
  border-top-right-radius: 25px;
  margin-top: -25px;
`;

export const Title = styled.Text`
  font-size: 30px;
  margin-top: 20px;
  font-weight: bold;
`;


export const ButtonTextUrderline = styled.Text`
  margin-top: 12px;
  margin-bottom: 18px;
  color: #28502e;
  font-weight: bold;
  text-decoration: underline;
`;
