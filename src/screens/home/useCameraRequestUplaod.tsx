import { useContextAuth } from "../../context/Auth.context";
import { HttpCode } from "../../service/httpCode";
import { photosService } from "../../service/photos.service";
import { usePhotos } from "./usePhotos";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
export const useCameraRequestUplaod = () => {
  const { user } = useContextAuth();
  const { handleFetch, handleLogaut } = usePhotos();
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

  return {
    pickCameraAsync,
    pickImageAsync,
  };
};
