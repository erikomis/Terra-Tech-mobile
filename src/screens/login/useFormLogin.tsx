import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaLogin } from "../../yup/schemasValidations";
import { useState } from "react";
import { useContextAuth } from "../../context/Auth.context";
type FormData = {
  email: string;
  password: string;
};

export const useFormLogin = () => {
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
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    errorMensage,
  };
};
