import { useLocalSearchParams } from "expo-router";
import { Card } from "heroui-native";
import Transition from "react-native-screen-transitions";
import type { BoxRouteParams } from "@/components/navigation/screen-options";

export default function BoxDetail() {
	const { sharedBoundTag = "", title = "Box detail" } =
		useLocalSearchParams<BoxRouteParams>();

	return (
		<Transition.ScrollView className="flex-1 p-4 pt-safe">
			<Transition.View sharedBoundTag={sharedBoundTag}>
				<Card className="z-100 h-72 rounded-4xl" variant="secondary">
					<Transition.View styleId="box-content" className="flex-1">
						<Card.Body className="flex-1 justify-between p-4">
							<Card.Title className="text-2xl">{title}</Card.Title>
						</Card.Body>
					</Transition.View>
				</Card>
			</Transition.View>
		</Transition.ScrollView>
	);
}
