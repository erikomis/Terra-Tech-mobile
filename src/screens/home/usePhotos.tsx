import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContextAuth } from "../../context/Auth.context";
import { useState } from "react";
import { photosService } from "../../service/photos.service";
import { HttpCode } from "../../service/httpCode";
export const usePhotos = () => {
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

  const [nextPage, setNextPage] = useState<string>("photos/");
  const [breakPage, setBreakPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogaut = async () => {
    signOut();
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);
  };

  const handleFetch = async () => {
    setLoading(true);
    if (!user?.id) {
      navigation.navigate("Login");
      return;
    }
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

  return {
    analyse,
    handleFetch,
    handleLogaut,
    loading,
  }
};
