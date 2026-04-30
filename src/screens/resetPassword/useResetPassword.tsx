import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaResetPassword } from "../../yup/schemasValidations";
import { useContextAuth } from "../../context/Auth.context";
import { authService } from "../../service/auth.service";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes/types";

interface FormData {
  password: string;
  confirmPassword: string;
}

export const useResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { verifyToken, clearVerifyToken } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaResetPassword),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    const response = await authService.resetPassword(data.password, verifyToken);
    if (response.status !== 201) {
      setErrorMessage(response.data?.message ?? "Erro ao redefinir a senha");
      return;
    }
    clearVerifyToken();
    navigation.navigate("Login");
  };

  return { control, errors, handleSubmit, onSubmit, errorMessage };
};
