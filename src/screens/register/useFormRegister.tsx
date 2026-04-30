import { useContextAuth } from "../../context/Auth.context";
import { useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { schemaRegister } from "../../yup/schemasValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
type FormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};


export const useFormRegister = () => {
  const navigator = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [errorMensage, setErrorMensage] = useState<string>("");
  const { register } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const response = await register(data);
    if (response) {
      setErrorMensage(response.mensagem);
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
