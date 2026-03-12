import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

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
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
