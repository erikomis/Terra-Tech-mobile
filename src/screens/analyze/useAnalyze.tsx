import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { HttpCode } from "../../service/httpCode";
import { photosService } from "../../service/photos.service";

type AnalyzeData = {
  type: number;
  count: number;
};

export const useAnalyze = () => {
  const [analyze, setAnalyze] = useState<AnalyzeData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = useCallback(async (month?: string) => {
    setLoading(true);
    try {
      const currentMonth = String(new Date().getMonth() + 1);
      const response = await photosService.analise(month ?? currentMonth);

      if (response.status === HttpCode.OK) {
        setAnalyze([
          { type: 1, count: response.data.true_disease },
          { type: 0, count: response.data.false_disease },
        ]);
        return;
      }

      if (response.status === HttpCode.UNAUTHORIZED) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        return;
      }

      Alert.alert("Erro", "Erro ao buscar análises. Tente novamente.");
    } catch {
      Alert.alert("Erro", "Erro ao buscar análises. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { loading, analyze, handleFetch };
};
