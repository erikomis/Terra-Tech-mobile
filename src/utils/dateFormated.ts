export const dateFormated = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR");
};
