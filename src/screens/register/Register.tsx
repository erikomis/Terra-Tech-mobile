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
import { useFormRegister } from "./useFormRegister";
import { View } from "react-native-animatable";
import Logo from "../../assets/images/logo.svg";
export const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { control, errorMensage, errors, handleSubmit, onSubmit } =
    useFormRegister();
  return (
    <Container>
      <ContainerHeader animation="fadeIn" delay={500}>
        <View style={{
          marginTop: -80,
        
        }}>
          <Logo width={500} height={500} />
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
          <Title>Criar Conta</Title>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
            name="lastName"
            placeholder="Sobrenome"
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
            title="Criar Conta"
            IsBoxContainer
          />
          {errorMensage && <ErrorText>{errorMensage}</ErrorText>}
        </ScrollView>
      </FormContainer>
    </Container>
  );
};
