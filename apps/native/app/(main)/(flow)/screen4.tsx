import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Screen4() {
  const router = useRouter();
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  const handleComplete = () => {
    // Navigate back to the beginning or home
    // Using navigate instead of dismissTo to avoid native/JS state sync issues
    // when dismissing multiple screens at once
    router.navigate("/(main)/(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColorBackground }]}>
      <Text style={[styles.title, { color: themeColorForeground }]}>Screen 4</Text>
      <Text style={[styles.subtitle, { color: themeColorForeground }]}>
        This is the final screen in the flow
      </Text>
      <Pressable style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>Complete Flow</Text>
      </Pressable>
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
    backgroundColor: "#34C759",
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
