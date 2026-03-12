import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { Platform, useColorScheme } from "react-native";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="detail"
					options={{
						title: "Detail",
					}}
				/>
				<Stack.Screen
					name="modal"
					options={{
						title: "Modal",
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="full-screen-modal"
					options={{
						title: "Full Screen Modal",
						presentation: "fullScreenModal",
						animation:
							Platform.OS === "android" ? "slide_from_bottom" : "default",
					}}
				/>
				<Stack.Screen
					name="form-sheet"
					options={{
						title: "Form Sheet",
						presentation: "formSheet",
						sheetAllowedDetents: [0.5, 1.0],
						sheetGrabberVisible: true,
						sheetCornerRadius: 20,
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
