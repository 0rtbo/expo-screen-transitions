import { router } from "expo-router";
import { Button } from "heroui-native";
import { View } from "react-native";
import type { OverlayProps } from "react-native-screen-transitions";
import { getFlowOptions } from "@/components/navigation/screen-options";
import { Stack } from "@/components/stack";

export default function FlowLayout() {
	return (
		<View
			className="flex-1 overflow-hidden"
			style={{
				borderRadius: 50,
			}}
		>
			<Stack>
				<Stack.Screen
					name="screen1"
					options={{
						...OVERLAY_OPTIONS,
						meta: {
							onPress: () => router.navigate("/screen2"),
						},
					}}
				/>
				<Stack.Screen
					name="screen2"
					options={{
						...getFlowOptions(),
						meta: {
							onPress: () => router.navigate("/screen3"),
						},
					}}
				/>
				<Stack.Screen
					name="screen3"
					options={{
						...getFlowOptions(),
						meta: {
							onPress: () => router.navigate("/screen4"),
						},
					}}
				/>
				<Stack.Screen
					name="screen4"
					options={{
						...getFlowOptions(),
						meta: {
							onPress: () => router.dismissTo("/(main)/(tabs)"),
						},
					}}
				/>
			</Stack>
		</View>
	);
}

const FlowOverlay = ({ meta }: OverlayProps) => {
	return (
		<View className="flex-1 items-center justify-between px-8 pt-safe pb-safe">
			<View className="mt-2 h-1.5 w-32 rounded-3xl bg-border" />
			<View className="w-full">
				<Button onPress={() => (meta as { onPress: () => void })?.onPress?.()}>
					<Button.Label>Next</Button.Label>
				</Button>
			</View>
		</View>
	);
};

const OVERLAY_OPTIONS = {
	overlay: FlowOverlay,
	overlayMode: "float",
	overlayShown: true,
} as const;
