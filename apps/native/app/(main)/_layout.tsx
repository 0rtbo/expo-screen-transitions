import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	getBoxSharedElementOptions,
	getFullScreenSheeetScale,
	getSnapSheetOptions,
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
					options={({ route }) => getBoxSharedElementOptions(route.params)}
				/>
				<Stack.Screen name="basic" options={slideOptions()} />
				<Stack.Screen name="sheet" options={getSnapSheetOptions()} />
			</Stack>
		</View>
	);
}
