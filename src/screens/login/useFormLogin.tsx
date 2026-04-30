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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { signIn } = useContextAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    const response = await signIn(data);
    if (response?.message) {
      setErrorMessage(response.message);
    }
    // Navigation handled automatically by Router when user state updates
  };

  return { control, handleSubmit, errors, onSubmit, errorMessage };
};
