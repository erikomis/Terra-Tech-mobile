import { Text, View } from "react-native";
import { ButtonBase } from "../../components/button/styles";
import { colors } from "../../theme/colors";

interface HeaderHomeProps {
  pickCameraAsync: () => void;
  pickImageAsync: () => void;
  name: string;
}

export const HeaderHome = ({ pickCameraAsync, pickImageAsync, name }: HeaderHomeProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryLight,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.accent,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Bem-vindo, {name}
        </Text>
      </View>
      <ButtonBase onPress={pickCameraAsync}>
        <Text style={{ color: colors.textLight, fontSize: 16 }}>
          Tirar foto para análise
        </Text>
      </ButtonBase>
      <ButtonBase onPress={pickImageAsync}>
        <Text style={{ color: colors.textLight, fontSize: 16 }}>
          Usar foto da galeria para análise
        </Text>
      </ButtonBase>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.accent,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Análises realizadas
        </Text>
      </View>
    </View>
  );
};
