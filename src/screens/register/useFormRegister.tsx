import { useContextAuth } from "../../context/Auth.context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { schemaRegister } from "../../yup/schemasValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthStackParamList } from "../../routes/types";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useFormRegister = () => {
  const navigator = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { register } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
    defaultValues: { name: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    const response = await register(data);
    if (response) {
      setErrorMessage(response.message);
      return;
    }
    navigator.navigate("Login", {
      message: "Conta criada com sucesso! Verifique seu e-mail para ativar a conta.",
    });
  };

  return { control, handleSubmit, errors, onSubmit, errorMessage };
};
