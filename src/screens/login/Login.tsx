import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputBase } from "../../components/InputBase/InputBase";
import { InputPasswordBase } from "../../components/InputBase/InputPasswordBase";
import { Button } from "../../components/button/Button";
import { Text, TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContextAuth } from "../../context/Auth.context";
import {
  ButtonTextUrderline,
  Container,
  ContainerHeader,
  FormContainer,
  SubTitle,
  Title,
} from "./style";
import { useState } from "react";
import { ErrorText } from "../../components/errorText/errorText";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required("Email é obrigatorio").email("Email invalido"),
  password: yup
    .string()
    .required("Senha é obrigatorio")
    .min(6, "Senha deve ter no minimo 6 caracteres")
    .max(16, "Senha deve ter no maximo 10 caracteres"),
});
export const Login = () => {
  const [errorMensage, setErrorMensage] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { signIn } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const response = await signIn(data);
    console.log(response);
    
    if (response?.mensagem) {
      setErrorMensage(response.mensagem);
    }
  };

  return (
    <Container>
      <ContainerHeader animation="fadeIn" delay={500}></ContainerHeader>

      <FormContainer animation="fadeInUp" delay={500}>
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
        <ErrorText>{errorMensage}</ErrorText>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <ButtonTextUrderline>Esqueceu a senha?</ButtonTextUrderline>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <ButtonTextUrderline>Criar conta</ButtonTextUrderline>
        </TouchableOpacity>
      </FormContainer>
    </Container>
  );
};
