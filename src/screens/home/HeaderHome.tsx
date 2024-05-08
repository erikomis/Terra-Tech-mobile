import { Text, View } from "react-native";
import { ButtonBase } from "../../components/button/styles";
import { Button } from "../../components/button/Button";
import { useContextAuth } from "../../context/Auth.context";

export const HeaderHome = ({
  pickCameraAsync,
  pickImageAsync,
  handleLogaut,
  name,
}: {
  pickCameraAsync: () => void;
  pickImageAsync: () => void;
  handleLogaut: () => void;
  name: string;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#d5fcd5",
        margin: 0,
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
          }}
        >
          Tirar Foto para analise
        </Text>
      </ButtonBase>
      <ButtonBase onPress={pickImageAsync}>
        <Text
          style={{
            color: "#f1f1f1",
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
    // <View
    //   style={{
    //     flex: 1,
    //   }}
    // >
    //   <View
    //     style={{
    //       alignItems: "center",
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <Text
    //       style={{
    //         fontSize: 20,
    //         fontWeight: "bold",
    //         color: "#6F4E37",
    //         marginTop: 20,
    //         marginBottom: 10,
    //       }}
    //     >
    //       Bem vindo ao Terra tech app 🌱 {
    //         user.name.split(" ")[0]
    //       }
    //     </Text>

    //     <Button onPress={handleLogaut} title="Sair"  />
    //   </View>
    //   <ButtonBase onPress={pickCameraAsync}>
    //     <Text
    //       style={{
    //         color: "#f1f1f1",
    //       }}
    //     >
    //       Tirar Foto para analise
    //     </Text>
    //   </ButtonBase>
    //   <ButtonBase onPress={pickImageAsync}>
    //     <Text
    //       style={{
    //         color: "#f1f1f1",
    //       }}
    //     >
    //       Usar foto da galeria para a analise
    //     </Text>
    //   </ButtonBase>
    //   <View
    //     style={{
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text
    //       style={{
    //         fontSize: 20,
    //         fontWeight: "bold",
    //         color: "#6F4E37",
    //         marginTop: 20,
    //         marginBottom: 10,
    //       }}
    //     >
    //       Lista de itens
    //     </Text>
    //   </View>
    // </View>
  );
};
