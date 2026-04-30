import {
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useEffect, } from "react";

import { CardHome } from "./CardHome";
import { HeaderHome } from "./HeaderHome";


import { useContextAuth } from "../../context/Auth.context";
import { Empety } from "./Empety";
import { usePhotos } from "./usePhotos";


export const Home = () => {
  const { user } = useContextAuth();
  const {
    analyse,
    deleteAnalyse,
    pickCameraAsync,
    getAnalyses,
    loading,
    pickGaleriaAsync,
  } = usePhotos({
    user: { id: user.id },
  });
  const handleAlertGaleria = () => {
    Alert.alert(
      "Atenção",
      "Para que analise funcione corretamente você precisa que escolher uma foto de uma folha de café.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => pickGaleriaAsync(),
        },
      ]
    );
  };

  const hanldeAlertCamera = () => {
    Alert.alert(
      "Atenção",
      "Para que analise funcione corretamente, precisa que seja escolhido foto uma folha de café",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => pickCameraAsync(),
        },
      ]
    );
  };

  // useEffect(() => {
  //   Alert.alert(
  //     "Atenção",
  //     "Para que analise funcione corretamente, precisa que seja escolhido foto uma folha de café",
  //     [
  //       {
  //         text: "Cancelar",
  //         style: "cancel",
  //       },
  //       {
  //         text: "OK",
  //       },
  //     ]
  //   );
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();

  //     const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
  //     if (statusCamera.status !== "granted") {
  //       alert(
  //         "Desculpe, precisamos de permissões de câmera para fazer isso funcionar!"
  //       );
  //     }
  //     if (status !== "granted") {
  //       alert(
  //         "Desculpe, precisamos de permissões de armazenamento para fazer isso funcionar!"
  //       );
  //     }
  //   })(),
  //     [];
  // });

  useEffect(() => {
    const showAlertAndRequestPermissions = async () => {
      // Mostrar alerta
      Alert.alert(
        "Atenção",
        "Para que a análise funcione corretamente, é necessário escolher uma foto de uma folha de café",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "OK",
          },
        ]
      );

      // Solicitar permissões
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

      if (cameraStatus !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Desculpe, precisamos de permissões de câmera para fazer isso funcionar!"
        );
      }

      if (mediaStatus !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Desculpe, precisamos de permissões de armazenamento para fazer isso funcionar!"
        );
      }
    };

    showAlertAndRequestPermissions();
  }, []);

  const confirmeDelete = (id: string) => {
    Alert.alert("Atenção", "Deseja realmente excluir essa análise?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => deleteAnalyse(id),
      },
    ]);
  };
  return (
    <>
      <FlatList
        style={{ marginTop: 0, backgroundColor: "#28502E", flex: 1 }}
        data={analyse}
        ListHeaderComponent={
          <HeaderHome
            pickCameraAsync={hanldeAlertCamera}
            pickImageAsync={handleAlertGaleria}
            name={user.name}
          />
        }
        ListEmptyComponent={<Empety />}
        renderItem={({ item }) => (
          <CardHome item={item} confirmeDelete={confirmeDelete} />
        )}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        onEndReached={() => getAnalyses()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#fff" /> : null
        }
      />
    </>
  );
};
