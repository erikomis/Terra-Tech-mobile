import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Button } from "../../components/button/Button";
import { Container } from "../login/style";
import { ContainerForm, Title, Text, ContainerLogo } from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export const Welcome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <Container>
      <ContainerLogo
        delay={500}
        animation={"flipInY"}
      ></ContainerLogo>
      <ContainerForm delay={1000}
        animation={"fadeInUp"}
      >
        <Title>Faça Analise usando imagem da Folhas de café</Title>
        <Text>Faca o login para comecar</Text>

        <Button onPress={() => navigation.navigate("Login")} title="Acessar" />
        </ContainerForm>
    </Container>
  );
};
