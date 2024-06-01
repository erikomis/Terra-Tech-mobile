import styled from "styled-components/native";
import * as Animated from "react-native-animatable";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerHeader = styled(Animated.View)`
  /* height: 30%; */
  flex: 1;
  background-color: #28502e;
  align-items: center;
`;
export const FormContainer = styled(Animated.View)`
  background-color: white;
  flex: 2;
  width: 100%;
  align-items: center;
  border-top-right-radius: 25px;
  margin-top: -25px; 
`;

export const Title = styled.Text`
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
`;

export const ButtonTextUrderline = styled.Text`
  color: #28502e;
  font-weight: bold;
  text-decoration: underline;
  margin-top: 6px;
`;
