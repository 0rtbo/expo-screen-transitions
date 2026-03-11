import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Surface, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Transition from "react-native-screen-transitions";

function Modal() {
  const accentForegroundColor = useThemeColor("accent-foreground");
  const backgroundColor = useThemeColor("background");
  const insets = useSafeAreaInsets();

  function handleClose() {
    router.back();
  }

  return (
    <Transition.ScrollView
      style={{ flex: 1, backgroundColor }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
      }}
    >
      {/* Drag indicator */}
      <View className="absolute top-3 self-center">
        <View className="w-10 h-1 rounded-full bg-muted" />
      </View>

      <Surface variant="secondary" className="p-5 w-full max-w-sm rounded-lg">
        <View className="items-center">
          <View className="w-12 h-12 bg-accent rounded-lg items-center justify-center mb-3">
            <Ionicons name="checkmark" size={24} color={accentForegroundColor} />
          </View>
          <Text className="text-foreground font-medium text-lg mb-1">Modal Screen</Text>
          <Text className="text-muted text-sm text-center mb-4">
            Swipe down to dismiss or tap the button below.
          </Text>
        </View>
        <Button onPress={handleClose} className="w-full" size="sm">
          <Button.Label>Close</Button.Label>
        </Button>
      </Surface>
    </Transition.ScrollView>
  );
}

export default Modal;
