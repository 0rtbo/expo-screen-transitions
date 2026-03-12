import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<SymbolView
							name={{ ios: "house", android: "home", web: "home" }}
							tintColor={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<SymbolView
							name={{ ios: "safari", android: "explore", web: "explore" }}
							tintColor={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
