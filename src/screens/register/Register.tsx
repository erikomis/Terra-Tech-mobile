import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputBase } from "../../components/InputBase/InputBase";
import { InputPasswordBase } from "../../components/InputBase/InputPasswordBase";
import { Button } from "../../components/button/Button";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ErrorText } from "../../components/errorText/errorText";
import {
  ButtonTextUrderline,
  Container,
  ContainerHeader,
  FormContainer,
  Title,
} from "./styles";
import { useContextAuth } from "../../context/Auth.context";
import { useState } from "react";
type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatorio")
    .min(6, "Nome deve ter no minimo 6 caracteres"),
  email: yup.string().required("Email é obrigatorio").email("Email invalido"),
  password: yup
    .string()
    .required("Senha é obrigatorio")
    .min(6, "Senha deve ter no minimo 6 caracteres")
    .max(12, "Senha deve ter no maximo 12 caracteres"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder"),
});
export const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [errorMensage, setErrorMensage] = useState<string>("");
  const { register } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const response = await register(data);
    if (response) {
      setErrorMensage(response.mensagem);
    }
  };

  return (
    <Container>
      <ContainerHeader animation="fadeIn" delay={500}></ContainerHeader>

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
          <Title>Criar Conta</Title>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <ButtonTextUrderline>
              Já registrado? acesse Aqui
            </ButtonTextUrderline>
          </TouchableOpacity>
          <InputBase
            control={control}
            errors={errors}
            name="name"
            placeholder="Nome"
          />
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

          <InputPasswordBase
            control={control}
            errors={errors}
            name="confirmPassword"
            placeholder={"Confirmar Senha"}
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            title="Login"
            IsBoxContainer
          />
          {errorMensage && <ErrorText>{errorMensage}</ErrorText>}
        </ScrollView>
      </FormContainer>
    </Container>
  );
};
