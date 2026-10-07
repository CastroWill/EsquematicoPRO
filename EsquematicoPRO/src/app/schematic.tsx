import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAssets } from "expo-asset";
import { PdfView } from "@kishannareshpal/expo-pdf";

import {
  schematicElements,
  getFocusRegion,
} from "../constants/schematicElements";

export default function SchematicScreen() {
  const [assets] = useAssets([
    require("../../assets/schematics/Esquemático_Pag.7.pdf"),
  ]);

  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const searchResult = search.trim()
    ? schematicElements.filter((element) =>
        element.text.toLowerCase().includes(search.trim().toLowerCase()),
      )
    : [];

  const selectedElement = searchResult[0] ?? null;

  const focusRegion = selectedElement ? getFocusRegion(selectedElement) : null;

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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar no esquemático..."
          placeholderTextColor="#777"
          returnKeyType="search"
        />

        {selectedElement && focusRegion && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Encontrado: {selectedElement.text}
            </Text>

            <Text style={styles.focusText}>
              Página {selectedElement.page} • Região:{" "}
              {Math.round(focusRegion.x)}, {Math.round(focusRegion.y)} •{" "}
              {Math.round(focusRegion.width)} × {Math.round(focusRegion.height)}
            </Text>
          </View>
        )}
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

  searchContainer: {
    backgroundColor: "#111",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },

  searchInput: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111",
  },

  resultContainer: {
    marginTop: 6,
  },

  resultText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
  },

  focusText: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 4,
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
