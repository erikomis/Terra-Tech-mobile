import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/button/Button";
import { TouchableOpacity } from "react-native";

import {
  ButtonTextUrderline,
  Container,
  ContainerForm,
  ContainerLogo,
  Title,
} from "./style";
import { InputPasswordBase } from "../../components/InputBase/InputPasswordBase";
import { View } from "react-native-animatable";
import Logo from "../../assets/images/logo.svg";
import { useResetPassword } from "./useResetPassword";


export const ResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { control, errors, handleSubmit, onSubmit } = useResetPassword();
  return (
    <Container>
      <ContainerLogo delay={500} animation={"flipInY"}>
        <View
          style={{
            marginTop: -80,
          }}
        >
          <Logo width={500} height={500} />
        </View>
      </ContainerLogo>
      <ContainerForm delay={1000} animation={"fadeInUp"}>
        <Title>Nova senha</Title>
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
          IsBoxContainer
          onPress={handleSubmit(onSubmit)}
          title="Criar nova senha"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <ButtonTextUrderline>Voltar para o login</ButtonTextUrderline>
        </TouchableOpacity>
      </ContainerForm>
    </Container>
  );
};
