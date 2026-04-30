import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "../../components/button/Button";
import { TouchableOpacity, View } from "react-native";
import { InputBase } from "../../components/InputBase/InputBase";
import {
  ButtonTextUrderline,
  Container,
  ContainerForm,
  ContainerLogo,
  Title,
} from "./style";
import { useFormVerifyCode } from "./useFormVerifyCode";
import Logo from "../../assets/images/logo.svg";
import { useContextAuth } from "../../context/Auth.context";

export const VerifyCode = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { control, errorMensage, errors, onSubmit, handleSubmit } =
    useFormVerifyCode();
    const { loading } = useContextAuth();
  return (
    <Container>
      <ContainerLogo delay={500} animation={"flipInY"}>
        <View
          style={{
            marginTop: -5,
          }}
        >
          <Logo width={500} height={500} />
        </View>
      </ContainerLogo>
      <ContainerForm delay={1000} animation={"fadeInUp"}>
        <Title>Verificar código</Title>
        <InputBase
          control={control}
          errors={errors}
          name="token"
          placeholder="Código"
        />
        <Button
          disabled={loading}
          IsBoxContainer
          onPress={handleSubmit(onSubmit)}
          title="Acessar"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <ButtonTextUrderline>Voltar para o login</ButtonTextUrderline>
        </TouchableOpacity>
      </ContainerForm>
    </Container>
  );
};
