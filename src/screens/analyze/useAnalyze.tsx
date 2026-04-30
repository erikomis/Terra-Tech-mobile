import { useEffect, useState } from "react";
import { photosService } from "../../service/photos.service";

export const useAnalyze = () => {
  const [analyze, setAnalyze] = useState<
    {
      type: number;
      count: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async (month?: string) => {
    setLoading(true);
    const mesAtual = String(new Date().getMonth() + 1);
    const response = await photosService.analise(month ? month : mesAtual);
    if (response.status === 200) {
      const responseAdpter = [
        {
          type: 1,
          count: response.data.true_disease,
        },
        {
          type: 0,
          count: response.data.false_disease,
        },
      ];

      setAnalyze(responseAdpter);
      setLoading(false);
    }
    if (response.status === 401) {
      console.log("error");
    }

    if (response.status === 500) {
      console.log("error");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return {
    loading,
    analyze,
    handleFetch,
  };
};
