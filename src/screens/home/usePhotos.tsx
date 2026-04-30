import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { HttpCode } from "../../service/httpCode";
import { photosService } from "../../service/photos.service";
import {
  MoveImageAsync,
  PickImageAsync,
  PickImageGalleryAsync,
} from "../../utils/system";
type paginationType = {
  next: string | null;
  previous: string | null;
  count: number;
  isUpdate: boolean;
};

type Analyse = {
  id: string;
  image: string;
  there_disease: boolean;
  created_at: string;
};

const url = "photos/?limit=:limite&offset=:offset";
const limite = "10";
export const usePhotos = ({
  user: { id },
}: {
  user: {
    id: string;
  };
}) => {
  const [loading, setLoading] = useState(false);
  const [analyse, setAnalyse] = useState<Analyse[]>([]);

  const pagination = useRef<paginationType>({
    next: null,
    previous: null,
    count: 0,
    isUpdate: true,
  });

  const pickCameraAsync = async () => {
    const imagePickResult = await PickImageAsync();
    if (imagePickResult.canceled) {
      Alert.alert("Você não selecionou nenhuma imagem.");
      return;
    }

    const { fileUri, imageName } = await MoveImageAsync(imagePickResult);
    const formData = new FormData();

    const photo = {
      uri: fileUri,
      name: imageName,
      type: imagePickResult.assets[0].mimeType || "",
    };

    formData.append("image", photo as any);
    formData.append("user", id);
    const response = await photosService.createPhotosImage(formData);

    if (response.status !== HttpCode.CREATED) {
      alert("Erro ao enviar a imagem");
      return;
    }

    pagination.current.isUpdate = true;
    await getAnalyses();

    Alert.alert("Sucesso", "Imagem enviada com sucesso");
  };

  const pickGaleriaAsync = async () => {
    const imageGalleryResult = await PickImageGalleryAsync();
    if (imageGalleryResult.canceled) {
      Alert.alert("Você não selecionou nenhuma imagem.");
      return;
    }

    const { fileUri, imageName } = await MoveImageAsync(imageGalleryResult);

    const formData = new FormData();

    const photo = {
      uri: fileUri,
      name: imageName,
      type: imageGalleryResult.assets[0].mimeType || "",
    };

    formData.append("image", photo as any);

    formData.append("user", id);

    const response = await photosService.createPhotosImage(formData);

    if (response.status !== HttpCode.CREATED) {
      alert("Erro ao enviar a imagem");
      return;
    }

    pagination.current.isUpdate = true;

    await getAnalyses();
  };

  const getAnalyses = async () => {
    setLoading(true);

    if (!pagination.current.isUpdate && !pagination.current.next) {
      setLoading(false);
      return;
    }

    const urlRequest = url
      .replace(":limite", limite)
      .replace(":offset", pagination.current.next || "0");
    console.log(urlRequest);

    const response = await photosService.list(urlRequest);

    if (response.status !== HttpCode.OK) {
      alert("Erro ao buscar as imagens");
      return;
    }

    pagination.current = {
      next: response.data.next,
      previous: response.data.previous,
      count: response.data.count,
      isUpdate: false,
    };
    const newAnalyse = response.data.results.filter((item: Analyse) => {
      return !analyse.find((analyse) => analyse.id === item.id);
    });

    setAnalyse([...analyse, ...newAnalyse]);

    setLoading(false);
  };

  const deleteAnalyse = async (id: string) => {
    const response = await photosService.deletePhoto(id);

    if (response.status !== HttpCode.NO_CONTENT) {
      alert("Erro ao deletar a imagem");
      return;
    }
    const newAnalyse = analyse.filter((item) => item.id !== id);

    setAnalyse(newAnalyse);
  };

  return {
    loading,
    analyse,
    pickCameraAsync,
    pickGaleriaAsync,
    getAnalyses,
    deleteAnalyse,
  };
};
