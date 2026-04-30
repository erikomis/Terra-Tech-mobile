import { InputBase } from "../../components/InputBase/InputBase";
import { InputPasswordBase } from "../../components/InputBase/InputPasswordBase";
import { Button } from "../../components/button/Button";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ButtonTextUrderline,
  Container,
  ContainerHeader,
  FormContainer,
  Title,
} from "./style";
import Logo from "../../assets/images/logo.svg";
import { ErrorText } from "../../components/errorText/errorText";
import { useFormLogin } from "./useFormLogin";
import { useContextAuth } from "../../context/Auth.context";
import { useEffect } from "react";
import { AuthStackParamList } from "../../routes/types";

export const Login = () => {
  const route = useRoute<RouteProp<AuthStackParamList, "Login">>();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { loading } = useContextAuth();
  const { control, handleSubmit, errors, onSubmit, errorMessage } = useFormLogin();

  useEffect(() => {
    if (route.params?.message) {
      Alert.alert("Sucesso", route.params.message);
    }
  }, [route.params]);

  return (
    <Container>
      <ContainerHeader animation="fadeIn" delay={500}>
        <View style={{ marginTop: -100 }}>
          <Logo width={300} height={400} />
        </View>
      </ContainerHeader>

      <FormContainer animation="fadeInUp" delay={500}>
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Title>Login</Title>
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
            placeholder="Senha"
          />
          {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
          <Button
            onPress={handleSubmit(onSubmit)}
            title="Acessar"
            IsBoxContainer
            disabled={loading}
          />
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
