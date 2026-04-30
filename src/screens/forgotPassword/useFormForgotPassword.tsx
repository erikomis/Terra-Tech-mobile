import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaForgotPassword } from "../../yup/schemasValidations";
import { authService } from "../../service/auth.service";
import { HttpCode } from "../../service/httpCode";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { AuthStackParamList } from "../../routes/types";

type FormData = {
  email: string;
};

export const useFormForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaForgotPassword),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    const response = await authService.forgotPassword(data.email);
    if (response.status !== HttpCode.OK) {
      setErrorMessage("Email não encontrado ou inválido");
      return;
    }
    navigation.navigate("VerifyCode");
  };

  return { control, handleSubmit, errorMessage, errors, onSubmit };
};
