import { Alert, Image, Text, View } from "react-native";
import { dateFormated } from "../../utils/dateFormated";
import {
  ButtonDelete,
  CardContainer,
  CardContent,
  CardContentText,
  CardDescription,
  CardImage,
  CardText,
  CardTitle,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

export const CardHome = ({
  item,
  confirmeDelete,
}: {
  item: {
    id: string;
    image: string;
    there_disease: boolean;
    created_at: string;
  };
  confirmeDelete: (id: string) => void;
}) => {
  return (
    <CardContainer>
      <CardContent>
        <CardImage source={{ uri: item.image }} />

        <CardContentText>
          <CardTitle>Folha Analisada</CardTitle>
          <CardDescription>
            {item.there_disease
              ? "Análise de imagem: Folha com praga"
              : "Análise de imagem: Folha saudável"}
          </CardDescription>
          <CardText>Data de Análise: {dateFormated(item.created_at)}</CardText>
          <ButtonDelete onPress={() => confirmeDelete(item.id)}>
            <MaterialIcons name="delete" size={24} color="black" />
          </ButtonDelete>
        </CardContentText>
      </CardContent>
    </CardContainer>
  );
};
