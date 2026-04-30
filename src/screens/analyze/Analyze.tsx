import { useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { CartesianChart, Bar } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { useAnalyze } from "./useAnalyze";
import RNPickerSelect from "react-native-picker-select";
import { mouthrs } from "../../utils/mouthrs";

export const Analyze = () => {
  const font = useFont(require("../../fonts/Roboto-Regular.ttf"), 12);
  const [innerPadding, setInnerPadding] = useState(0.8);
  const [roundedCorner, setRoundedCorner] = useState(5);
  const [selectedMouth, setSelectedMouth] = useState(
    String(new Date().getMonth() + 1)
  );
  const { analyze, loading, handleFetch } = useAnalyze();

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#E5F5E5" }}>
      <View style={{ marginTop: 50, width: 400, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#28502E" }}>
          Análise de Pragas de Café
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          width: 400,
          height: 400,
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#6F4E37" />
        ) : (
          <>
            <CartesianChart
              xKey="type"
              padding={2}
              yKeys={["count"]}
              domainPadding={{ left: 50, right: 50, top: 30 }}
              domain={{ y: [0, 100] }}
              axisOptions={{
                font,
                tickCount: 17,
                formatXLabel: (value) => {
                  if (value === 0) return "Saudável";
                  if (value === 1) return "Doente";
                  return "";
                },
                lineColor: "#666",
                labelColor: "#666",
              }}
              data={analyze}
            >
              {({ points, chartBounds }) => (
                <Bar
                  points={points.count}
                  chartBounds={chartBounds}
                  animate={{ type: "spring" }}
                  innerPadding={innerPadding}
                  roundedCorners={{
                    topLeft: roundedCorner,
                    topRight: roundedCorner,
                  }}
                >
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 400)}
                    colors={["#78C557", "#583d1a"]}
                  />
                </Bar>
              )}
            </CartesianChart>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#999",
                marginTop: 10,
              }}
            >
              <RNPickerSelect
                placeholder={{
                  label: "Selecione o mês",
                }}
                style={{
                  inputAndroid: {
                    color: "#333",
                    backgroundColor: "#FFF",

                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderColor: "#999",
                    borderWidth: 2,
                  },
                  inputIOS: {
                    backgroundColor: "#FFF",
                    width: 200,
                    height: 50,
                    margin: 10,
                    padding: 10,
                    color: "#333",
                    borderRadius: 5,
                    borderColor: "#999",
                    borderWidth: 1,
                  },
                  placeholder: {
                    color: "#666",
                  },
                  iconContainer: {
                    top: 15,
                    right: 15,
                  },
                }}
                onValueChange={(value) => {
                  setSelectedMouth(value);
                  handleFetch(value);
                }}
                items={mouthrs}
                value={selectedMouth}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    flex: 1.5,
  },
  optionsScrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  options: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
