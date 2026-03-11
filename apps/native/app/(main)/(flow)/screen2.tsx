import { Link } from "expo-router";
import { useThemeColor } from "heroui-native";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Screen2() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  return (
    <View style={[styles.container, { backgroundColor: themeColorBackground }]}>
      <Text style={[styles.title, { color: themeColorForeground }]}>Screen 2</Text>
      <Text style={[styles.subtitle, { color: themeColorForeground }]}>
        This is the second screen in the flow
      </Text>
      <Link href="./screen3" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Screen 3</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
