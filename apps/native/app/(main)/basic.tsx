import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Pressable, Text, View } from "react-native";

export default function BasicScreen() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-background-secondary p-4 pt-safe">
			<View className="flex-1 items-center justify-center gap-4">
				<Text className="font-bold text-2xl text-foreground">Basic Screen</Text>
				<Text className="text-center text-foreground">
					This screen uses the iOS slide transition
				</Text>
				<Button onPress={() => router.back()}>
					<Button.Label>Go Back</Button.Label>
				</Button>
			</View>
		</View>
	);
}
