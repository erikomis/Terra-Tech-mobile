import {
  FlatList,
  Alert,
  View,
  Text,
  ActivityIndicator,
  Modal,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

import { CardHome } from "./CardHome";
import { HeaderHome } from "./HeaderHome";

import { usePhotos } from "./usePhotos";
import { useContextAuth } from "../../context/Auth.context";
import { useCameraRequestUplaod } from "./useCameraRequestUplaod";
import { Empety } from "./Empety";

export const Home = () => {
  const { user } = useContextAuth();
  const { analyse, handleFetch, handleLogaut, loading } = usePhotos();
  const { pickCameraAsync, pickImageAsync } = useCameraRequestUplaod();
  const HandleAlertArma = () => {
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
          onPress: () => pickImageAsync(),
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

  useEffect(() => {
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
        },
      ]
    );
  }, []);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
      if (statusCamera.status !== "granted") {
        alert(
          "Desculpe, precisamos de permissões de câmera para fazer isso funcionar!"
        );
      }
      if (status !== "granted") {
        alert(
          "Desculpe, precisamos de permissões de armazenamento para fazer isso funcionar!"
        );
      }
    })(),
      [];
  });
  return (
    <>
      <FlatList
        style={{ marginTop: 5, backgroundColor: "#28502E", flex: 1 }}
        data={analyse}
        ListHeaderComponent={
          <HeaderHome
            pickCameraAsync={hanldeAlertCamera}
            pickImageAsync={HandleAlertArma}
            handleLogaut={handleLogaut}
            name={user?.name}
          />
        }
        ListEmptyComponent={<Empety />}
        renderItem={({ item }) => <CardHome item={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => handleFetch()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#6F4E37" /> : null
        }
      />
    </>
  );
};
