import { useNavigation } from "@react-navigation/native";
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
import { useFormForgotPassword } from "./useFormForgotPassword";
import { ErrorText } from "../../components/errorText/errorText";
import Logo from "../../assets/images/logo.svg";
import { AuthStackParamList } from "../../routes/types";

export const ForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { control, errors, errorMessage, handleSubmit, onSubmit } = useFormForgotPassword();

  return (
    <Container>
      <ContainerLogo delay={500} animation={"flipInY"}>
        <View>
          <Logo width={500} height={700} />
        </View>
      </ContainerLogo>
      <ContainerForm delay={1000} animation={"fadeInUp"}>
        <Title>Recuperar senha</Title>
        <InputBase
          control={control}
          errors={errors}
          name="email"
          placeholder="Email"
        />
        <Button
          IsBoxContainer
          onPress={handleSubmit(onSubmit)}
          title="Recuperar senha"
        />
        {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <ButtonTextUrderline>Voltar para o login</ButtonTextUrderline>
        </TouchableOpacity>
      </ContainerForm>
    </Container>
  );
};
