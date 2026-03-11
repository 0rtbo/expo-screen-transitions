import { Input } from "heroui-native";
import { Text, View } from "react-native";

export default function Screen2() {
	return (
		<View className="flex-1 items-center justify-center bg-background px-8">
			<Text className="font-semibold text-2xl text-foreground">Screen 2</Text>
			<Input className="w-full" autoFocus />
		</View>
	);
}
