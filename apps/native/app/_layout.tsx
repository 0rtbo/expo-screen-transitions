import "@/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AppThemeProvider, useAppTheme } from "@/contexts/app-theme-context";

export const unstable_settings = {
	initialRouteName: "(main)",
};

function ThemedStatusBar() {
	const { isLight } = useAppTheme();
	return <StatusBar style={isLight ? "dark" : "light"} />;
}

export default function Layout() {
	return (
		<GestureHandlerRootView className="flex-1">
			<KeyboardProvider>
				<AppThemeProvider>
					<ThemedStatusBar />
					<HeroUINativeProvider>
						<Slot />
					</HeroUINativeProvider>
				</AppThemeProvider>
			</KeyboardProvider>
		</GestureHandlerRootView>
	);
}
