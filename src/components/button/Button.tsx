import { ButtonBase, BoxButton, Text } from "./styles";

type ButtonProps = {
  title: string
  onPress: () => void
  IsBoxContainer?: boolean
};


export const Button = ({ title, onPress, IsBoxContainer }: ButtonProps) => {
  return (
    <>
      {IsBoxContainer ? (
        <BoxButton>
          <ButtonBase onPress={onPress}>
            <Text>{title}</Text>
          </ButtonBase>
        </BoxButton>
      ) : (
        <ButtonBase onPress={onPress}>
          <Text>{title}</Text>
        </ButtonBase>
      )}
    </>
  );
};
