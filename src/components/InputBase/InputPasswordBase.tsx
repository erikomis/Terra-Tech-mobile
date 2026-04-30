import { Control, Controller, FieldErrors } from "react-hook-form";
import { BoxPassword, Text, TextInput } from "./styles";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface InputPasswordBaseProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  placeholder?: string;
}

export const InputPasswordBase = ({
  name,
  control,
  errors,
  placeholder,
}: InputPasswordBaseProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  return (
    <BoxPassword>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            $colorBorderType={!!errors?.[name]?.message}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => setSecureTextEntry((prev) => !prev)}
        style={{ position: "absolute", right: 10, top: 20, width: 20, height: 20 }}
      >
        <MaterialIcons
          name={secureTextEntry ? "visibility-off" : "visibility"}
          size={20}
          color="black"
        />
      </TouchableOpacity>
      {!!errors[name] && (
        <Text size="14px" colorType={!!errors?.[name]?.message}>
          {errors?.[name]?.message?.toString()}
        </Text>
      )}
    </BoxPassword>
  );
};
