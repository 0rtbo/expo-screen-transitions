import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	getFullScreenSheeetScale,
	getSharedElementOptions,
	slideOptions,
} from "@/components/navigation/screen-options";
import { Stack } from "@/components/stack";

export default function MainLayout() {
	const { top } = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-black">
			<Stack>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen
					name="(flow)"
					options={getFullScreenSheeetScale({ top })}
				/>
				<Stack.Screen
					name="box"
					options={({ route }) =>
						getSharedElementOptions(
							(route.params as { sharedBoundTag?: string })?.sharedBoundTag ??
								"",
						)
					}
				/>
				<Stack.Screen name="basic" options={slideOptions()} />
			</Stack>
		</View>
	);
}
