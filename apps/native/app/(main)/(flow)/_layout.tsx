import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";

export default function FlowLayout() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: themeColorBackground,
        },
        headerTintColor: themeColorForeground,
        headerTitleStyle: {
          color: themeColorForeground,
          fontWeight: "600",
        },
        contentStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Stack.Screen name="screen1" options={{ title: "Screen 1" }} />
      <Stack.Screen name="screen2" options={{ title: "Screen 2" }} />
      <Stack.Screen name="screen3" options={{ title: "Screen 3" }} />
      <Stack.Screen name="screen4" options={{ title: "Screen 4" }} />
    </Stack>
  );
}
