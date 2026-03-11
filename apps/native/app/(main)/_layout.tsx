import Transition from "react-native-screen-transitions";

import { Stack } from "@/components/stack";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(flow)"
        options={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          // ...Transition.Presets.DraggableCard(),
        }}
      />
    </Stack>
  );
}
