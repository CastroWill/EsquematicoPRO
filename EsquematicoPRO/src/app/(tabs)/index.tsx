import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ESQUEMÁTICO PRO</Text>

        <Text style={styles.subtitle}>
          Encontre rapidamente o que procura no esquemático
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar no esquemático..."
          placeholderTextColor="#777"
        />

        <Pressable
          style={styles.openButton}
          onPress={() => router.push("/schematic")}
        >
          <Text style={styles.openButtonText}>Abrir esquemático</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginTop: 12,
    marginBottom: 32,
  },

  searchInput: {
    height: 52,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  openButton: {
    height: 52,
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  openButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
