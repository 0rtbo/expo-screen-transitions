import { router } from "expo-router";
import { Button, Card } from "heroui-native";
import { FlatList, Pressable, View } from "react-native";
import Transition from "react-native-screen-transitions";
import { Header } from "@/components/header";
import { TablerIcon } from "@/components/icons";

type Box = {
	id: string;
	title: string;
	description: string;
};

const boxes: Box[] = [
	{ id: "box-1", title: "Box 1", description: "Tap to see shared transition" },
	{ id: "box-2", title: "Box 2", description: "Tap to see shared transition" },
	{ id: "box-3", title: "Box 3", description: "Tap to see shared transition" },
	{ id: "box-4", title: "Box 4", description: "Tap to see shared transition" },
	{ id: "box-5", title: "Box 5", description: "Tap to see shared transition" },
	{ id: "box-6", title: "Box 6", description: "Tap to see shared transition" },
];

export default function Discover() {
	return (
		<View className="flex-1 bg-background">
			<FlatList
				data={boxes}
				numColumns={2}
				keyExtractor={(item) => item.id}
				contentContainerClassName="gap-4 p-4 pt-safe"
				columnWrapperClassName="gap-4"
				style={{ paddingTop: 56 + 14 }}
				renderItem={({ item }) => (
					<Transition.Pressable
						sharedBoundTag={item.id}
						className="flex-1"
						onPress={() => {
							router.push({
								pathname: "/(main)/box",
								params: {
									sharedBoundTag: item.id,
									title: item.title,
									description: item.description,
								},
							});
						}}
					>
						<Card className="z-10 h-36 rounded-2xl" variant="secondary" />
					</Transition.Pressable>
				)}
			/>

			<Button
				variant="primary"
				isIconOnly
				className="absolute right-4 bottom-4"
				onPress={() => router.navigate("/(main)/(flow)/screen1")}
			>
				<TablerIcon name="meteor-filled" className="text-primary-foreground" />
			</Button>
		</View>
	);
}
