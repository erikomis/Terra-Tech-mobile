import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaResetPassword } from "../../yup/schemasValidations";
import { useContextAuth } from "../../context/Auth.context";
import { authService } from "../../service/auth.service";
import { useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface FormData {
  password: string;
}

export const useResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [errorMensage, setErrorMensage] = useState<string>("");
  const { 
    verifyToken,clearVerifyToken
   } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaResetPassword),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    
    const response = await authService.resetPassword(data.password, verifyToken);

    if (response.status !== 200) {
      setErrorMensage(response.data.message);
      return;
    }
    clearVerifyToken();
    navigation.navigate("Login");

  }
  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
};
