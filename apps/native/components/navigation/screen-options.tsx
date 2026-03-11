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
		}: any) => {
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
		screenStyleInterpolator: ({ progress, bounds }: any) => {
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
		}: any) => {
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
					borderRadius: focused ? radius : 0,
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
