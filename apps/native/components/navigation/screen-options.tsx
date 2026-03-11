import { interpolate } from "react-native-reanimated";
import type { BlankStackNavigationOptions } from "react-native-screen-transitions/blank-stack";

const SNAPPY_SPRING = {
	stiffness: 1000,
	damping: 500,
	mass: 3,
	overshootClamping: true,
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
		}: any) => {
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
		}: any) => {
			"worklet";
			const scale = interpolate(progress, [0, 1, 2], [1, 1, 0.96], "clamp");
			const translateY = interpolate(
				progress,
				[0, 1, 2],
				[height, 0, top],
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
