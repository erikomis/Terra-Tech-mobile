import { useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Dimensions } from "react-native";
import { CartesianChart, Bar } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { useAnalyze } from "./useAnalyze";
import RNPickerSelect from "react-native-picker-select";
import { mouthrs } from "../../utils/mouthrs";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");
const CHART_SIZE = width - 32;

export const Analyze = () => {
  const font = useFont(require("../../fonts/Roboto-Regular.ttf"), 12);
  const [selectedMouth, setSelectedMouth] = useState(String(new Date().getMonth() + 1));
  const { analyze, loading, handleFetch } = useAnalyze();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Análise de Pragas de Café</Text>
      </View>

      <View style={[styles.card, { width: CHART_SIZE, height: CHART_SIZE }]}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.accent} />
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
                lineColor: colors.textSecondary,
                labelColor: colors.textSecondary,
              }}
              data={analyze}
            >
              {({ points, chartBounds }) => (
                <Bar
                  points={points.count}
                  chartBounds={chartBounds}
                  animate={{ type: "spring" }}
                  innerPadding={0.8}
                  roundedCorners={{ topLeft: 5, topRight: 5 }}
                >
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, CHART_SIZE)}
                    colors={[colors.chartGradientStart, colors.chartGradientEnd]}
                  />
                </Bar>
              )}
            </CartesianChart>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{ label: "Selecione o mês" }}
                style={{
                  inputAndroid: {
                    color: colors.textMedium,
                    backgroundColor: colors.white,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderColor: colors.borderSecondary,
                    borderWidth: 2,
                  },
                  inputIOS: {
                    backgroundColor: colors.white,
                    width: 200,
                    height: 50,
                    margin: 10,
                    padding: 10,
                    color: colors.textMedium,
                    borderRadius: 5,
                    borderColor: colors.borderSecondary,
                    borderWidth: 1,
                  },
                  placeholder: { color: colors.textSecondary },
                  iconContainer: { top: 15, right: 15 },
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primaryBackground,
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  card: {
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  pickerContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSecondary,
    marginTop: 10,
  },
});
