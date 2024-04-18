import {
  Controller,
} from "react-hook-form";
import { Box, Text, TextInput } from "./styles";



export const InputBase = ({ name, control, errors, placeholder }: any) => {
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
  
            onChangeText={onChange}
            value={value}
            $colorBorderType={!!errors?.[name]?.message}
          />
        )}
      />
      {!!errors[name] && (
        <Text size="14px" colorType={!!errors?.[name]?.message}>
          {errors?.[name]?.message?.toString()}
        </Text>
      )}
    </Box>
  );
};
