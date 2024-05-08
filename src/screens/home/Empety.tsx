import { View, Text } from "react-native-animatable";

export const Empety = () => {
  return (
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
  );
};
