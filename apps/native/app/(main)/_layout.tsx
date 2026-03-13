import { View } from "react-native";
import {
	getBoxSharedElementOptions,
	getFullScreenSheeetScale,
	getSnapSheetOptions,
	getStackTestOptions,
	slideOptions,
} from "@/components/navigation/screen-options";
import { Stack } from "@/components/stack";

export default function MainLayout() {
	return (
		<View className="flex-1 bg-black">
			<Stack>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="(flow)" options={getFullScreenSheeetScale()} />
				<Stack.Screen
					name="box"
					options={({ route }) => getBoxSharedElementOptions(route.params)}
				/>
				<Stack.Screen name="stack-test/[id]" options={getStackTestOptions()} />
				<Stack.Screen name="basic" options={slideOptions} />
				<Stack.Screen name="sheet" options={getSnapSheetOptions()} />
			</Stack>
		</View>
	);
}
