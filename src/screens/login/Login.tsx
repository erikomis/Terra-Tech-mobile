import { InputBase } from "../../components/InputBase/InputBase";
import { InputPasswordBase } from "../../components/InputBase/InputPasswordBase";
import { Button } from "../../components/button/Button";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  ButtonTextUrderline,
  Container,
  ContainerHeader,
  FormContainer,
  SubTitle,
  Title,
} from "./style";
import Logo from "../../assets/images/logo.svg";
import { ErrorText } from "../../components/errorText/errorText";
import { useFormLogin } from "./useFormLogin";

export const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { control, handleSubmit, errors, onSubmit, errorMensage } =
    useFormLogin();
  return (
    <Container>
      <ContainerHeader animation="fadeIn" delay={500}>
        <View
          style={{
            marginTop: -100,
          }}
        >
          <Logo width={400} height={400}  />
        </View>
      </ContainerHeader>

      <FormContainer animation="fadeInUp" delay={500}>
        <ScrollView
          style={{
            width: "100%",
            flex: 1,
          }}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
        <Title>Login</Title>
        <SubTitle>Faça o login para continuar </SubTitle>
        <InputBase
          control={control}
          errors={errors}
          name="email"
          placeholder="Email"
        />

        <InputPasswordBase
          control={control}
          errors={errors}
          name="password"
          placeholder={"Senha"}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Login" IsBoxContainer />
        {errorMensage && <ErrorText>{errorMensage}</ErrorText>}
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <ButtonTextUrderline>Esqueceu a senha?</ButtonTextUrderline>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <ButtonTextUrderline>Criar conta</ButtonTextUrderline>
        </TouchableOpacity>
        </ScrollView>
      </FormContainer>
    </Container>
  );
};
