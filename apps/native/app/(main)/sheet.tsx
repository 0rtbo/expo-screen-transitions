import { router } from "expo-router";
import { Button, Card } from "heroui-native";
import { Text, View } from "react-native";
import Transition, { snapTo } from "react-native-screen-transitions";
import {
	SHEET_INITIAL_SNAP_INDEX,
	SHEET_SNAP_POINTS,
} from "@/components/navigation/screen-options";

const snapActions = SHEET_SNAP_POINTS.map((point, index) => ({
	index,
	label: `${Math.round(point * 100)}%`,
}));

const activeProps = [
	{
		name: "snapPoints",
		value: JSON.stringify(SHEET_SNAP_POINTS),
		description:
			"Three resting positions so you can test expand + collapse behavior.",
	},
	{
		name: "initialSnapIndex",
		value: String(SHEET_INITIAL_SNAP_INDEX),
		description:
			"Starts in the middle so the first drag can go in either direction.",
	},
	{
		name: "expandViaScrollView",
		value: "true",
		description:
			"Swipe upward at the scroll boundary to expand the sheet like Apple Maps.",
	},
	{
		name: "backdropBehavior",
		value: '"collapse"',
		description:
			"Tap outside the sheet to step down through snap points, then dismiss it.",
	},
	{
		name: "snapVelocityImpact",
		value: "0.1",
		description:
			"Keeps snap targeting deliberate instead of overly flick-sensitive.",
	},
	{
		name: "transitionSpec.expand / collapse",
		value: "custom spring",
		description:
			"Uses a softer spring for between-snap movement than full open/close.",
	},
];

const commentedProps = [
	{
		name: "gestureSnapLocked",
		description:
			"Uncomment it in `screen-options.tsx` if you want gestures locked to the current snap point while keeping `snapTo()` active.",
	},
	{
		name: "backdropComponent",
		description:
			"Uncomment it in `screen-options.tsx` to swap in the provided `SheetBackdrop` component and own the backdrop press behavior yourself.",
	},
];

const practiceCards = [
	{
		title: "Drag the sheet",
		body: "Pull the sheet up and down to feel each snap point and the custom expand/collapse spring.",
	},
	{
		title: "Tap the backdrop",
		body: "Because `backdropBehavior` is set to `collapse`, each tap steps down one snap point before dismissing.",
	},
	{
		title: "Scroll to expand",
		body: "At the top of this `Transition.ScrollView`, keep swiping up to test `expandViaScrollView`.",
	},
	{
		title: "Call snapTo()",
		body: "Use the buttons above to jump straight to a snap point without relying on gestures.",
	},
	{
		title: "Try the commented props",
		body: "Toggle the commented options in the stack config and rerun the same gestures to compare behavior.",
	},
	{
		title: "Observe the corners",
		body: "The sheet rounds more when collapsed and tightens slightly as it approaches full height.",
	},
];

export default function SheetScreen() {
	return (
		<View className="flex-1 bg-background-secondary pb-safe">
			<View
				pointerEvents="none"
				className="absolute inset-x-0 top-0 z-10 items-center bg-background-secondary py-2"
			>
				<View className="h-1.5 w-32 rounded-3xl bg-border" />
			</View>

			<Transition.ScrollView
				className="flex-1"
				contentContainerStyle={{
					gap: 16,
					padding: 16,
					paddingTop: 44,
					paddingBottom: 100,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-row flex-wrap gap-3">
					{snapActions.map((action) => (
						<Button
							key={action.label}
							size="sm"
							variant="secondary"
							onPress={() => snapTo(action.index)}
						>
							<Button.Label>{`snapTo(${action.index})`}</Button.Label>
						</Button>
					))}
					<Button size="sm" onPress={() => router.back()}>
						<Button.Label>Close</Button.Label>
					</Button>
				</View>

				<Card variant="secondary" className="rounded-4xl">
					<Card.Body className="gap-4 p-4">
						<Text className="font-bold text-foreground text-xl">
							Live configuration
						</Text>
						{activeProps.map((prop) => (
							<View
								key={prop.name}
								className="gap-1 rounded-3xl bg-background p-3"
							>
								<Text className="font-semibold text-foreground text-sm">
									{prop.name}: {prop.value}
								</Text>
								<Text className="text-foreground text-sm leading-5 opacity-70">
									{prop.description}
								</Text>
							</View>
						))}
					</Card.Body>
				</Card>

				{/*<Card variant="secondary" className="rounded-4xl">
					<Card.Body className="gap-4 p-4">
						<Text className="font-bold text-foreground text-xl">
							Commented props to try next
						</Text>
						{commentedProps.map((prop) => (
							<View
								key={prop.name}
								className="gap-1 rounded-3xl bg-background p-3"
							>
								<Text className="font-semibold text-foreground text-sm">
									{prop.name}
								</Text>
								<Text className="text-foreground text-sm leading-5 opacity-70">
									{prop.description}
								</Text>
							</View>
						))}
					</Card.Body>
				</Card>*/}

				{/*{practiceCards.map((card) => (
					<Card key={card.title} variant="secondary" className="rounded-4xl">
						<Card.Body className="gap-2 p-4">
							<Text className="font-bold text-foreground text-lg">
								{card.title}
							</Text>
							<Text className="text-base text-foreground leading-6 opacity-70">
								{card.body}
							</Text>
						</Card.Body>
					</Card>
				))}*/}
			</Transition.ScrollView>
		</View>
	);
}
