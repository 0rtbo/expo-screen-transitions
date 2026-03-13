import { router } from "expo-router";
import { Button } from "heroui-native";
import { Keyboard, View } from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	type OverlayProps,
	useScreenAnimation,
} from "react-native-screen-transitions";
import { getFlowOptions } from "@/components/navigation/screen-options";
import { Stack } from "@/components/stack";

const BOTTOM_OFFSET = 16;

export default function FlowLayout() {
	return (
		<View
			className="flex-1 overflow-hidden"
			style={{
				borderRadius: 50,
				borderCurve: "continuous",
			}}
		>
			<Stack>
				<Stack.Screen
					name="screen1"
					options={{
						overlay: FlowOverlay,
						meta: { onPress: () => router.navigate("/screen2") },
					}}
				/>
				<Stack.Screen
					name="screen2"
					options={{
						...getFlowOptions(),
						meta: {
							label: "red 2",
							onPress: () => {
								router.navigate("/screen3");
								Keyboard.dismiss();
							},
						},
					}}
				/>
				<Stack.Screen
					name="screen3"
					options={{
						...getFlowOptions(),
						meta: { onPress: () => router.navigate("/screen4") },
					}}
				/>
				<Stack.Screen
					name="screen4"
					options={{
						...getFlowOptions(),
						meta: { onPress: () => router.dismissTo("/(main)/(tabs)") },
					}}
				/>
			</Stack>
		</View>
	);
}

// ============================================================================
// Step Progress
// ============================================================================
const FLOW_STEPS = 4;

const DOT_SIZE = 8;

const ProgressDot = ({
	index,
	progress,
}: {
	index: number;
	progress: SharedValue<number>;
}) => {
	const isActive = useDerivedValue(() => {
		const distance = Math.abs(progress.value - index);
		return Math.max(1 - distance, 0);
	});

	const dotStyle = useAnimatedStyle(() => ({
		opacity: interpolate(isActive.value, [0, 1], [0.3, 1]),
		transform: [{ scale: interpolate(isActive.value, [0, 1], [1, 1.3]) }],
	}));

	return (
		<Animated.View
			className="rounded-full bg-foreground"
			style={[{ width: DOT_SIZE, height: DOT_SIZE }, dotStyle]}
		/>
	);
};

const StepProgress = ({ progress }: { progress: SharedValue<number> }) => {
	return (
		<View className="flex-row items-center justify-center" style={{ gap: 8 }}>
			{Array.from({ length: FLOW_STEPS }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static list, never reorders
				<ProgressDot key={i} index={i} progress={progress} />
			))}
		</View>
	);
};

// ============================================================================
// Flow Overlay
// ============================================================================
const FlowOverlay = ({ progress, meta }: OverlayProps) => {
	const { bottom } = useSafeAreaInsets();
	const screenAnimation = useScreenAnimation();
	const onPress = (meta as { onPress?: () => void })?.onPress;
	const adjustedProgress = useDerivedValue(() => progress.value - 1);
	const keyboardProgress = useSharedValue(0);
	const referenceHeight = useSharedValue<number | null>(null);

	useKeyboardHandler(
		{
			onStart: (e) => {
				"worklet";
				const willShow = e.progress === 1;

				if (willShow && e.height > 0) {
					referenceHeight.value = e.height;
				}

				keyboardProgress.value = withSpring(willShow ? 1 : 0, {
					stiffness: 1000,
					damping: 500,
					mass: 3,
					overshootClamping: true,
				});
			},
		},
		[],
	);

	const containerStyle = useAnimatedStyle(() => {
		const { progress: screenProgress } = screenAnimation.value;
		return {
			opacity: interpolate(screenProgress, [0, 1], [0, 1], "clamp"),
		};
	});

	const buttonStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					keyboardProgress.value,
					[0, 1],
					[0, -(referenceHeight.value ?? 0) + bottom - BOTTOM_OFFSET],
				),
			},
		],
	}));

	return (
		<Animated.View
			pointerEvents="box-none"
			className="flex-1 items-center justify-between px-8 pt-safe"
			style={[
				{ paddingBottom: bottom, overflow: "visible" as const },
				containerStyle,
			]}
		>
			<View className="mt-2 h-1.5 w-32 rounded-3xl bg-border" />
			<Animated.View className="w-full gap-4" style={buttonStyle}>
				<StepProgress progress={adjustedProgress} />
				<Button onPress={onPress}>
					<Button.Label>Next</Button.Label>
				</Button>
			</Animated.View>
		</Animated.View>
	);
};
