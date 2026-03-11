import { Input } from "heroui-native";
import { Text, View } from "react-native";

export default function Screen2() {
	return (
		<View className="flex-1 bg-background-secondary p-safe">
			<View className="gap-2 p-8">
				<Text className="font-semibold text-2xl text-foreground">TWO</Text>
				<Input className="w-full" placeholder="Two input" autoFocus />
			</View>
		</View>
	);
}
