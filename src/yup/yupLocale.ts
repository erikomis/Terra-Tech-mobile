import * as yup  from "yup";


yup.setLocale({
  mixed: {
    required: "O campo é obrigatório",
    default: "Campo inválido",
  },
  string: {
    email: "Email inválido",
    min: "Deve ter no mínimo ${min} caracteres",
    max: "Deve ter no máximo ${max} caracteres",
  },
  number: {
    min: "Deve ser maior que ${min}",
    max: "Deve ser menor que ${max}",
  },
});
export default yup;
