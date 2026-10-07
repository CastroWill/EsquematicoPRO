import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { PdfView } from "@kishannareshpal/expo-pdf";

export default function HomeScreen() {
  const [assets] = useAssets([
    require("../../assets/schematics/Esquemático_Pag.7.pdf"),
  ]);

  const [pdfUri, setPdfUri] = useState<string | null>(null);

  useEffect(() => {
    if (!assets?.length) {
      return;
    }

    assets[0]
      .downloadAsync()
      .then((asset) => {
        setPdfUri(asset.localUri);
      })
      .catch((error) => {
        console.error("Erro ao carregar o PDF:", error);
      });
  }, [assets]);

  if (!pdfUri) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando esquemático...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ESQUEMÁTICO PRO</Text>
      </View>

      <View style={styles.pdfContainer}>
        <PdfView
          style={styles.pdf}
          uri={pdfUri}
          fitMode="width"
          doubleTapToZoom
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },

  header: {
    height: 56,
    backgroundColor: "#111",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  pdfContainer: {
    flex: 1,
  },

  pdf: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 16,
    color: "#333",
  },
});
