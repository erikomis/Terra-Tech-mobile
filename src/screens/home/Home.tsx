import { FlatList, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect } from "react";
import { CardHome } from "./CardHome";
import { HeaderHome } from "./HeaderHome";
import { useContextAuth } from "../../context/Auth.context";
import { Empty } from "./Empty";
import { usePhotos } from "./usePhotos";
import { colors } from "../../theme/colors";

type AnalyseItem = {
  id: string;
  image: string;
  there_disease: boolean;
  created_at: string;
};

export const Home = () => {
  const { user } = useContextAuth();
  const { analyse, deleteAnalyse, pickCameraAsync, getAnalyses, loading, pickGaleriaAsync } =
    usePhotos({ user: { id: user.id } });

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert("Permissão necessária", "Precisamos de acesso à câmera para capturar imagens.");
      }
      if (mediaStatus !== "granted") {
        Alert.alert("Permissão necessária", "Precisamos de acesso à galeria para selecionar imagens.");
      }
    };
    requestPermissions();
  }, []);

  const handleAlertGaleria = useCallback(() => {
    Alert.alert(
      "Atenção",
      "Para que a análise funcione corretamente, escolha uma foto de uma folha de café.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "OK", onPress: pickGaleriaAsync },
      ]
    );
  }, [pickGaleriaAsync]);

  const handleAlertCamera = useCallback(() => {
    Alert.alert(
      "Atenção",
      "Para que a análise funcione corretamente, escolha uma foto de uma folha de café.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "OK", onPress: pickCameraAsync },
      ]
    );
  }, [pickCameraAsync]);

  const confirmeDelete = useCallback(
    (id: string) => {
      Alert.alert("Atenção", "Deseja realmente excluir essa análise?", [
        { text: "Cancelar", style: "cancel" },
        { text: "OK", onPress: () => deleteAnalyse(id) },
      ]);
    },
    [deleteAnalyse]
  );

  const renderItem = useCallback(
    ({ item }: { item: AnalyseItem }) => <CardHome item={item} confirmeDelete={confirmeDelete} />,
    [confirmeDelete]
  );

  const keyExtractor = useCallback((item: AnalyseItem) => item.id.toString(), []);

  return (
    <FlatList
      style={{ marginTop: 0, backgroundColor: colors.primary, flex: 1 }}
      data={analyse}
      ListHeaderComponent={
        <HeaderHome
          pickCameraAsync={handleAlertCamera}
          pickImageAsync={handleAlertGaleria}
          name={user.name}
        />
      }
      ListEmptyComponent={<Empty />}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={getAnalyses}
      onEndReachedThreshold={0.1}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color={colors.white} /> : null
      }
    />
  );
};
