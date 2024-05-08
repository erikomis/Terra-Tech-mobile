export const dateFormated = (date: string) => {
  const dateFormated = new Date(date);
  const day = dateFormated.getDate();
  const month = dateFormated.getMonth() + 1;
  const year = dateFormated.getFullYear();
  return `${day}/${month > 10 ? month : "0" + month}/${year}`;
};
