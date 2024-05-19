import { ButtonBase, BoxButton, Text } from "./styles";

type ButtonProps = {
  title: string;
  onPress: () => void;
  IsBoxContainer?: boolean;
  disabled: boolean;
};

export const Button = ({
  title,
  onPress,
  IsBoxContainer,
  disabled,
}: ButtonProps) => {
  return (
    <>
      {IsBoxContainer ? (
        <BoxButton>
          <ButtonBase onPress={onPress} disabled={disabled}>
            <Text>{title}</Text>
          </ButtonBase>
        </BoxButton>
      ) : (
        <ButtonBase onPress={onPress} disabled={disabled}>
          <Text>{title}</Text>
        </ButtonBase>
      )}
    </>
  );
};
