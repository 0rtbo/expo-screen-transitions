import { router } from "expo-router";
import { Pressable } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";
import {
	type ScreenInterpolationProps,
	useScreenAnimation,
} from "react-native-screen-transitions";
import type { BlankStackNavigationOptions } from "react-native-screen-transitions/blank-stack";

const SNAPPY_SPRING = {
	stiffness: 1000,
	damping: 500,
	mass: 3,
	overshootClamping: true,
};

const SHEET_SNAP_SPRING = {
	stiffness: 350,
	damping: 34,
	mass: 1,
	overshootClamping: true,
};

export const SHEET_SNAP_POINTS = [0.32, 0.64, 0.92];
export const SHEET_INITIAL_SNAP_INDEX = 2;

export type BoxRouteParams = {
	sharedBoundTag?: string;
	title?: string;
	description?: string;
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === "object" && value !== null;
};

export const SheetBackdrop = () => {
	const animation = useScreenAnimation();

	const style = useAnimatedStyle(() => ({
		opacity: interpolate(
			animation.value.current.progress,
			[0, 1],
			[0, 0.45],
			"clamp",
		),
		backgroundColor: "#020617",
	}));

	return (
		<Pressable style={{ flex: 1 }} onPress={() => router.back()}>
			<Animated.View style={[{ flex: 1 }, style]} />
		</Pressable>
	);
};

// ============================================================================
// fulls creen
// ============================================================================
export const getFullScreenSheet = (): BlankStackNavigationOptions => {
	return {
		experimental_enableHighRefreshRate: true,
		gestureEnabled: true,
		gestureDirection: "vertical" as const,
		screenStyleInterpolator: ({
			layouts: {
				screen: { height },
			},
			progress,
		}: ScreenInterpolationProps) => {
			"worklet";

			const translateY = interpolate(progress, [0, 1], [height, 0], "clamp");
			return {
				contentStyle: {
					transform: [{ translateY }],
				},
			};
		},
		transitionSpec: {
			open: SNAPPY_SPRING,
			close: SNAPPY_SPRING,
		},
	};
};
// ============================================================================
// full screen and scale
// ============================================================================
export const getFullScreenSheeetScale = ({
	top,
}: {
	top: number;
}): BlankStackNavigationOptions => {
	return {
		experimental_enableHighRefreshRate: true,
		gestureEnabled: true,
		gestureDirection: "vertical" as const,
		screenStyleInterpolator: ({
			layouts: {
				screen: { height },
			},
			progress,
		}: ScreenInterpolationProps) => {
			"worklet";
			const scale = interpolate(progress, [0, 1, 2], [1, 1, 0.96], "clamp");
			const translateY = interpolate(
				progress,
				[0, 1, 2],
				[height, 0, top - 14],
				"clamp",
			);

			return {
				contentStyle: {
					transform: [{ scale }, { translateY }],
				},
				overlayStyle: {
					backgroundColor: "transparent",
				},
			};
		},
		transitionSpec: {
			open: SNAPPY_SPRING,
			close: SNAPPY_SPRING,
		},
	};
};

// ============================================================================
// snap sheet
// ============================================================================
export const getSnapSheetOptions = (): BlankStackNavigationOptions => {
	return {
		experimental_enableHighRefreshRate: true,
		gestureEnabled: true,
		gestureDirection: "vertical" as const,
		snapPoints: SHEET_SNAP_POINTS,
		initialSnapIndex: SHEET_INITIAL_SNAP_INDEX,
		expandViaScrollView: true,
		backdropBehavior: "collapse",
		snapVelocityImpact: 0.1,
		// gestureSnapLocked: true,
		// backdropComponent: SheetBackdrop,
		screenStyleInterpolator: ({
			layouts: {
				screen: { height },
			},
			progress,
			snapIndex,
		}: ScreenInterpolationProps) => {
			"worklet";

			const translateY = interpolate(progress, [0, 1], [height, 0], "clamp");
			const borderRadius = interpolate(
				snapIndex,
				[0, SHEET_SNAP_POINTS.length - 1],
				[32, 20],
				"clamp",
			);
			const backdropOpacity = interpolate(
				progress,
				[
					0,
					SHEET_SNAP_POINTS[0],
					SHEET_SNAP_POINTS[SHEET_SNAP_POINTS.length - 1],
				],
				[0, 0.16, 0.45],
				"clamp",
			);

			return {
				contentStyle: {
					transform: [{ translateY }],
					borderTopLeftRadius: borderRadius,
					borderTopRightRadius: borderRadius,
					overflow: "hidden",
				},
				backdropStyle: {
					opacity: backdropOpacity,
					backgroundColor: "#020617",
				},
			};
		},
		transitionSpec: {
			open: SNAPPY_SPRING,
			close: SNAPPY_SPRING,
			expand: SHEET_SNAP_SPRING,
			collapse: SHEET_SNAP_SPRING,
		},
	};
};

// ============================================================================
// flow (horizontal push)
// ============================================================================
export const getFlowOptions = (): BlankStackNavigationOptions => {
	return {
		experimental_enableHighRefreshRate: true,
		gestureEnabled: true,
		gestureDirection: "horizontal" as const,
		screenStyleInterpolator: ({
			layouts: {
				screen: { width },
			},
			progress,
		}: ScreenInterpolationProps) => {
			"worklet";

			// 0→1: incoming (slides in from right)
			// 1→2: outgoing (gets pushed fully to the left)
			const translateX = interpolate(
				progress,
				[0, 1, 2],
				[width, 0, -width],
				"clamp",
			);

			return {
				contentStyle: {
					transform: [{ translateX }],
					backgroundColor: "transparent",
				},
			};
		},
		transitionSpec: {
			open: SNAPPY_SPRING,
			close: SNAPPY_SPRING,
		},
	};
};

// ============================================================================
// shared element (card expand)
// ============================================================================
export const getSharedElementOptions = (
	sharedBoundTag: string,
): BlankStackNavigationOptions => {
	return {
		experimental_enableHighRefreshRate: true,
		gestureEnabled: true,
		gestureDirection: "bidirectional",
		screenStyleInterpolator: ({
			progress,
			bounds,
		}: ScreenInterpolationProps) => {
			"worklet";
			return {
				contentStyle: {
					opacity: interpolate(progress, [0, 1], [0, 0.8], "clamp"),
				},
				[sharedBoundTag]: bounds({ id: sharedBoundTag, method: "transform" }),
			};
		},
		transitionSpec: {
			open: SNAPPY_SPRING,
			close: SNAPPY_SPRING,
		},
	};
};

export const getBoxSharedElementOptions = (
	params: unknown,
): BlankStackNavigationOptions => {
	if (!isObjectRecord(params)) {
		return getSharedElementOptions("");
	}

	const sharedBoundTag = params.sharedBoundTag;

	return getSharedElementOptions(
		typeof sharedBoundTag === "string" ? sharedBoundTag : "",
	);
};

// ============================================================================
// iOS slide (horizontal with scale effect on background)
// ============================================================================
const IOS_SLIDE_BORDER_RADIUS = 60;

export const slideOptions = (): BlankStackNavigationOptions => {
	return {
		experimental_enableHighRefreshRate: true,
		gestureEnabled: true,
		gestureDirection: "horizontal" as const,
		screenStyleInterpolator: ({
			layouts: {
				screen: { width },
			},
			progress,
			active,
			focused,
		}: ScreenInterpolationProps) => {
			"worklet";

			const radius = !active.animating ? 0 : IOS_SLIDE_BORDER_RADIUS;

			const translateX = interpolate(
				progress,
				[0, 1, 2],
				[width, 0, -width * 0.3],
			);

			return {
				contentStyle: {
					transform: [{ translateX }],
					borderRadius: IOS_SLIDE_BORDER_RADIUS,
					borderCurve: "continuous",
					overflow: "hidden",
				},
			};
		},
		transitionSpec: {
			open: SNAPPY_SPRING,
			close: SNAPPY_SPRING,
		},
	};
};
