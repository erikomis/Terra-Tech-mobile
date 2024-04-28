import { FlatList, Alert, View, Text, ActivityIndicator } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { CardHome } from "./CardHome";
import { HeaderHome } from "./HeaderHome";
import { useContextAuth } from "../../context/Auth.context";
import { photosService } from "../../service/photos.service";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import { HttpCode } from "../../service/httpCode";

export const Home = () => {
  const { user, signOut } = useContextAuth();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [analyse, setAnalyse] = useState<
    {
      id: string;
      image: string;
      there_disease: boolean;
      created_at: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState<string>("photos/");
  const [breakPage, setBreakPage] = useState(false);

  // useEffect(() => {
  //   handleFetch();
  // }, []);

  const handleLogaut = async () => {
    signOut();
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);
  };

  const handleFetch = async () => {
    console.log(analyse.length, "analyse.length");

    console.log(analyse, "analyse");

    setLoading(true);
    if (!user?.id) {
      navigation.navigate("Login");
      return;
    }

    console.log(nextPage, "nextPage");

    console.log(breakPage, "breakPage");

    if (breakPage || !nextPage) {
      setLoading(false);
      return;
    }

    const response = await photosService.list(user?.id, nextPage); // Adicione o parâmetro da página à função da API
    // Próxima página da API
    if (response.status === HttpCode.UNAUTHORIZED) {
      handleLogaut();
      navigation.navigate("Login");
      return;
    }

    if (nextPage === "photos/") {
      setAnalyse(response.data.results);

      setNextPage(response.data?.next);
      setBreakPage(response.data?.next === null ? true : false);
      setLoading(false);
      return;
    }

    setAnalyse((oldValue) => [...oldValue, ...response.data.results]);
    setNextPage(response.data?.next);
    setBreakPage(response.data?.next === null ? true : false);
    setLoading(false);
  };

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
  const pickCameraAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      const imageName = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );

      const fileUri = FileSystem.documentDirectory + imageName;

      await FileSystem.moveAsync({
        from: result.assets[0].uri,
        to: fileUri,
      });

      const photo = {
        uri: fileUri,
        name: imageName,
        type: result.assets[0].mimeType,
      };
      formData.append("image", {
        uri: photo.uri,
        name: photo.name,
        type: photo.type,
      });

      formData.append("user", user?.id);
      const response = await photosService.createPhotosImage(formData);

      if (response.status === HttpCode.UNAUTHORIZED) {
        handleLogaut();
        return;
      } else if (response.status !== HttpCode.CREATED) {
        alert("Erro ao enviar a imagem");
        return;
      }
      handleFetch();
    } else {
      alert("Você não selecionou nenhuma imagem.");
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();

      const imageName = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );

      const fileUri = FileSystem.documentDirectory + imageName;

      await FileSystem.moveAsync({
        from: result.assets[0].uri,
        to: fileUri,
      });

      const photo = {
        uri: fileUri,
        name: imageName,
        type: result.assets[0].mimeType,
      };
      formData.append("image", {
        uri: photo.uri,
        name: photo.name,
        type: photo.type,
      });
      formData.append("user", user?.id);
      const response = await photosService.createPhotosImage(formData);
      if (response.status === HttpCode.UNAUTHORIZED) {
        handleLogaut();
        return;
      } else if (response.status !== HttpCode.CREATED) {
        alert("Erro ao enviar a imagem");
        return;
      }

      handleFetch();
    } else {
      alert(
        "Você não selecionou nenhuma imagem. Para que a analise funcione corretamente, precisa que seja escolhido foto uma folha de café"
      );
    }
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
    <FlatList
      style={{ marginTop: 5, backgroundColor: "#F5F5F5", flex: 1 }}
      data={analyse}
      ListHeaderComponent={
        <HeaderHome
          pickCameraAsync={hanldeAlertCamera}
          pickImageAsync={HandleAlertArma}
          handleLogaut={handleLogaut}
        />
      }
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#6F4E37",
            }}
          >
            Nenhuma análise encontrada
          </Text>
        </View>
      }
      renderItem={({ item }) => <CardHome item={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => handleFetch()}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#6F4E37" /> : null
      }
    />
  );
};
