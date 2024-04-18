import { yupResolver } from "@hookform/resolvers/yup";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { schemaVerifyCode } from "../../yup/schemasValidations";
import { useState } from "react";
import { useContextAuth } from "../../context/Auth.context";
import { authService } from "../../service/auth.service";
import { HttpCode } from "../../service/httpCode";

interface FormData {
  token: string;
}
export const useFormVerifyCode = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { addToken } = useContextAuth();
  const [errorMensage, setErrorMensage] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaVerifyCode),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = async (data: FormData) => {

    
    const response = await authService.verifyToken(data.token);
    if (response.status !== HttpCode.OK) {
      setErrorMensage(response.data.message);
      return;
    }
    addToken(data.token);
    navigation.navigate("ResetPassword");
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    errorMensage,
  };
};
