import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { HttpCode } from "../../service/httpCode";
import { photosService } from "../../service/photos.service";
import { MoveImageAsync, PickImageAsync, PickImageGalleryAsync } from "../../utils/system";

type PaginationState = {
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

const PAGE_LIMIT = "10";

export const usePhotos = ({ user: { id } }: { user: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const [analyse, setAnalyse] = useState<Analyse[]>([]);
  const pagination = useRef<PaginationState>({
    next: null,
    previous: null,
    count: 0,
    isUpdate: true,
  });

  const getAnalyses = useCallback(async () => {
    if (!pagination.current.isUpdate && !pagination.current.next) return;
    setLoading(true);
    try {
      const offset = pagination.current.next ?? "0";
      const url = `photos/?limit=${PAGE_LIMIT}&offset=${offset}`;
      const response = await photosService.list(url);

      if (response.status !== HttpCode.OK) {
        Alert.alert("Erro", "Erro ao buscar as imagens. Tente novamente.");
        return;
      }

      pagination.current = {
        next: response.data.next,
        previous: response.data.previous,
        count: response.data.count,
        isUpdate: false,
      };

      setAnalyse((prev) => {
        const newItems = (response.data.results as Analyse[]).filter(
          (item) => !prev.some((a) => a.id === item.id)
        );
        return [...prev, ...newItems];
      });
    } catch {
      Alert.alert("Erro", "Erro ao buscar as imagens. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  const sendImage = useCallback(
    async (fileUri: string, imageName: string, mimeType: string) => {
      const formData = new FormData();
      formData.append("image", {
        uri: fileUri,
        name: imageName,
        type: mimeType,
      } as unknown as Blob);
      formData.append("user", id);

      const response = await photosService.createPhotosImage(formData);
      if (response.status !== HttpCode.CREATED) {
        Alert.alert("Erro", "Erro ao enviar a imagem. Tente novamente.");
        return false;
      }
      pagination.current.isUpdate = true;
      return true;
    },
    [id]
  );

  const pickCameraAsync = useCallback(async () => {
    try {
      const result = await PickImageAsync();
      if (result.canceled) return;
      const { fileUri, imageName } = await MoveImageAsync(result);
      const ok = await sendImage(fileUri, imageName, result.assets[0].mimeType ?? "image/jpeg");
      if (!ok) return;
      await getAnalyses();
      Alert.alert("Sucesso", "Imagem enviada com sucesso!");
    } catch {
      Alert.alert("Erro", "Não foi possível processar a imagem. Tente novamente.");
    }
  }, [sendImage, getAnalyses]);

  const pickGaleriaAsync = useCallback(async () => {
    try {
      const result = await PickImageGalleryAsync();
      if (result.canceled) return;
      const { fileUri, imageName } = await MoveImageAsync(result);
      const ok = await sendImage(fileUri, imageName, result.assets[0].mimeType ?? "image/jpeg");
      if (!ok) return;
      await getAnalyses();
      Alert.alert("Sucesso", "Imagem enviada com sucesso!");
    } catch {
      Alert.alert("Erro", "Não foi possível processar a imagem. Tente novamente.");
    }
  }, [sendImage, getAnalyses]);

  const deleteAnalyse = useCallback(async (itemId: string) => {
    try {
      const response = await photosService.deletePhoto(itemId);
      if (response.status !== HttpCode.NO_CONTENT) {
        Alert.alert("Erro", "Erro ao excluir a análise. Tente novamente.");
        return;
      }
      setAnalyse((prev) => prev.filter((item) => item.id !== itemId));
    } catch {
      Alert.alert("Erro", "Erro ao excluir a análise. Tente novamente.");
    }
  }, []);

  useEffect(() => {
    getAnalyses();
  }, [getAnalyses]);

  return { loading, analyse, pickCameraAsync, pickGaleriaAsync, getAnalyses, deleteAnalyse };
};
