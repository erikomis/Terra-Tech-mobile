import { Text, View } from "react-native";
import { ButtonBase } from "../../components/button/styles";
import { Button } from "../../components/button/Button";
import { useContextAuth } from "../../context/Auth.context";

export const HeaderHome = ({
  pickCameraAsync,
  pickImageAsync,
  name,
}: {
  pickCameraAsync: () => void;
  pickImageAsync: () => void;

  name: string;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#d5fcd5",
        margin: 0,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#6F4E37",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Bem-vindo {name}
        </Text>
      </View>
      <ButtonBase onPress={pickCameraAsync}>
        <Text
          style={{
            color: "#f1f1f1",
            fontSize: 16,
          }}
        >
          Tirar Foto para analise
        </Text>
      </ButtonBase>
      <ButtonBase onPress={pickImageAsync}>
        <Text
          style={{
            color: "#f1f1f1",
            fontSize: 16,
          }}
        >
          Usar foto da galeria para a analise
        </Text>
      </ButtonBase>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#6F4E37",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Analises realizadas
        </Text>
      </View>
    </View>
  );
};
