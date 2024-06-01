import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaLogin } from "../../yup/schemasValidations";
import { useState } from "react";
import { useContextAuth } from "../../context/Auth.context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
type FormData = {
  email: string;
  password: string;
};

export const useFormLogin = () => {
  const navigator = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [errorMensage, setErrorMensage] = useState<string>("");
  const { signIn } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const response = await signIn(data);
    
    if (response?.mensagem) {
      setErrorMensage(response.mensagem);
      return;
    }
    navigator.navigate("Login");
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    errorMensage,
  };
};
