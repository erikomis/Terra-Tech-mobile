import yup from "./yupLocale";

export const schemaLogin = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(16),
});

export const schemaRegister = yup.object().shape({
  name: yup.string().required().min(6),
  lastName: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(16),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});

export const schemaForgotPassword = yup.object().shape({
  email: yup.string().required().email(),
});

export const schemaVerifyCode = yup.object().shape({
  token: yup.string().required().min(6).max(6),
});

export const schemaResetPassword = yup.object().shape({
  password: yup.string().required().min(6).max(16),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});
