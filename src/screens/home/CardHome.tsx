import { Image, Text, View } from "react-native";
import { dateFormated } from "../../utils/dateFormated";
import {
  CardContainer,
  CardContend,
  CardContentText,
  CardImage,
  CardText,
  CardTitle,
} from "./styles";

export const CardHome = ({
  item,
}: {
  item: { image: string; there_disease: boolean; created_at: string };
}) => {
  return (
    // <View
    //   style={{
    //     backgroundColor: "#B9D497",
    //     margin: 5,
    //     padding: 10,
    //     borderRadius: 8,
    //   }}
    // >
    //   <View style={{ flexDirection: "row", alignItems: "center" }}>
    //     <Image
    //       source={{ uri: item.image }}
    //       style={{ width: 150, height: 200 }}
    //     />
    //     <View style={{ flex: 1, alignItems: "center" }}>
    //       <Text style={{ fontSize: 20, fontWeight: "bold", color: "#6F4E37" }}>
    //         Folha analisada
    //       </Text>
    //       <Text
    //         style={{
    //           fontSize: 16,
    //           color: "#6F4E37",
    //           marginLeft: 20,
    //           alignItems: "center",
    //         }}
    //       >
    //         {item.there_disease === true &&
    //           "Baseado na análise de imagem, a folha que você enviou está com uma praga"}

    //         {item.there_disease === false &&
    //           "Baseado na análise de imagem, a folha que você enviou está saudável"}
    //       </Text>
    //       <Text
    //         style={{
    //           fontSize: 16,
    //           color: "#6F4E37",
    //           marginLeft: 20,
    //           alignItems: "center",
    //         }}
    //       >
    //         data de análise: {dateFormated(item.created_at)}
    //       </Text>
    //     </View>
    //   </View>
    // </View>

    <CardContainer>
      <CardContend>
        <CardImage source={{ uri: item.image }} />

        <CardContentText>
          <CardTitle>Folha analisada</CardTitle>
          <CardText>
            {item.there_disease === true
              ? "Baseado na análise de imagem, a folha que você enviou está com uma praga"
              : "Baseado na análise de imagem, a folha que você enviou está saudável"}
          </CardText>
          <CardText>data de análise: {dateFormated(item.created_at)}</CardText>
        </CardContentText>
      </CardContend>
    </CardContainer>
  );
};
