import Transition from "react-native-screen-transitions";

import { Stack } from "@/components/stack";

export default function FlowLayout() {
	return (
		<Stack>
			<Stack.Screen name="screen1" />
			<Stack.Screen
				name="screen2"
				options={{
					...Transition.Presets.SlideFromBottom(),
				}}
			/>
			<Stack.Screen
				name="screen3"
				options={{
					...Transition.Presets.SlideFromBottom(),
				}}
			/>
			<Stack.Screen
				name="screen4"
				options={{
					...Transition.Presets.SlideFromBottom(),
				}}
			/>
		</Stack>
	);
}
