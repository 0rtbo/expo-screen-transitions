import { router, useLocalSearchParams } from "expo-router";
import { Button, Card } from "heroui-native";
import { Text, View } from "react-native";

const cardThemes = [
	{
		accent: "#0f766e",
		accentSoft: "#ccfbf1",
		label: "Arrival",
		description:
			"The newest card slides in from the bottom while the older deck compresses behind it.",
	},
	{
		accent: "#9a3412",
		accentSoft: "#ffedd5",
		label: "Guests",
		description:
			"Push again to create another route instance. The id in the pathname makes each card unique.",
	},
	{
		accent: "#1d4ed8",
		accentSoft: "#dbeafe",
		label: "Stay",
		description:
			"Only the top two cards stay visible. Anything deeper fades into the back slot.",
	},
	{
		accent: "#6d28d9",
		accentSoft: "#ede9fe",
		label: "Details",
		description:
			"This is the same screen file each time, but a new id gives you a fresh card in the stack.",
	},
] as const;

const parseStep = (value?: string | string[]) => {
	const raw = Array.isArray(value) ? value[0] : value;
	const parsed = Number(raw);

	if (!Number.isFinite(parsed) || parsed < 1) {
		return 1;
	}

	return Math.floor(parsed);
};

export default function StackTestScreen() {
	const { id } = useLocalSearchParams<{ id?: string | string[] }>();
	const step = parseStep(id);
	const nextStep = step + 1;
	const theme = cardThemes[(step - 1) % cardThemes.length];

	return (
		<View className="flex-1 bg-transparent pt-safe">
			<Card variant="secondary" className="flex-1 rounded-4xl">
				<Card.Body className="flex-1 justify-between gap-10 p-6">
					<View className="gap-6">
						<View
							className="self-start rounded-full px-3 py-1"
							style={{ backgroundColor: theme.accentSoft }}
						>
							<Text
								className="font-semibold text-xs uppercase"
								style={{ color: theme.accent }}
							>
								{theme.label}
							</Text>
						</View>

						<View className="gap-3">
							<Text className="font-semibold text-4xl text-foreground">
								Card {step}
							</Text>
							<Text className="text-base text-foreground leading-6 opacity-70">
								{theme.description}
							</Text>
						</View>

						<View className="gap-3 rounded-3xl bg-background px-4 py-4">
							<Text className="font-semibold text-base text-foreground">
								Path id: {step}
							</Text>
							<Text className="text-foreground text-sm leading-6 opacity-70">
								Tap push to navigate to{" "}
								<Text className="font-semibold text-foreground">
									/stack-test/{nextStep}
								</Text>{" "}
								and create a brand new modal card.
							</Text>
						</View>
					</View>

					<View className="gap-3">
						<Button onPress={() => router.push(`/stack-test/${nextStep}`)}>
							<Button.Label>Push Card {nextStep}</Button.Label>
						</Button>
						<Button variant="secondary" onPress={() => router.back()}>
							<Button.Label>Go Back</Button.Label>
						</Button>
					</View>
				</Card.Body>
			</Card>
		</View>
	);
}
