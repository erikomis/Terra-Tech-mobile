import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/button/Button";
import { TouchableOpacity } from "react-native";
import { InputBase } from "../../components/InputBase/InputBase";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ButtonTextUrderline,
  Container,
  ContainerForm,
  ContainerLogo,
  Title,
} from "./style";

type FormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().required("Email é obrigatorio").email("Email invalido"),
});

export const ForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: FormData) => {};

  return (
    <Container>
      <ContainerLogo delay={500} animation={"flipInY"}></ContainerLogo>
      <ContainerForm delay={1000} animation={"fadeInUp"}>
        <Title>Recuperar senha</Title>

        <InputBase
          control={control}
          errors={errors}
          name="email"
          placeholder="Email"
        />

        <Button IsBoxContainer onPress={() => navigation.navigate("Login")} title="Acessar" />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <ButtonTextUrderline>Voltar para o login</ButtonTextUrderline>
        </TouchableOpacity>
      </ContainerForm>
    </Container>
  );
};
