import { Controller } from "react-hook-form";
import { BoxPassword, Text, TextInput } from "./styles";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const InputPasswordBase = ({
  name,
  control,
  errors,
  placeholder,
}: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  return (
    <>
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
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          style={{ position: "absolute", right: 10, top: 20 }}
        >
          <MaterialIcons
            name={secureTextEntry ? "visibility-off" : "visibility"}
            size={20}
            color="black"
          />
        </TouchableOpacity>

        {!!errors[name] && (
          <Text
            size="14px"
            colorType={!!errors?.[name]?.message}
            style={{
              flexDirection: "column",
            }}
          >
            {errors?.[name]?.message?.toString()}
          </Text>
        )}
      </BoxPassword>
    </>
  );
};
