import { useLocalSearchParams } from "expo-router";
import { Card } from "heroui-native";
import { View } from "react-native";
import Transition from "react-native-screen-transitions";

export default function BoxDetail() {
	const { sharedBoundTag, title, description } = useLocalSearchParams<{
		sharedBoundTag: string;
		title: string;
		description: string;
	}>();

	return (
		<Transition.ScrollView className="flex-1 bg-background p-4 pt-safe">
			<Transition.View sharedBoundTag={sharedBoundTag}>
				<Card className="z-100 h-72 rounded-4xl" variant="secondary">
					<Card.Body className="flex-1 justify-between p-4">
						<Card.Title className="text-2xl">{title}</Card.Title>
					</Card.Body>
				</Card>
			</Transition.View>
		</Transition.ScrollView>
	);
}
