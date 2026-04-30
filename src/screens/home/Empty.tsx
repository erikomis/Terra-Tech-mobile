import { View, Text } from "react-native-animatable";
import { colors } from "../../theme/colors";

export const Empty = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}>
        Nenhuma análise encontrada
      </Text>
    </View>
  );
};
