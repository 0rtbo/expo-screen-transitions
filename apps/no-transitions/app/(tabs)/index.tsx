import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>No Transitions</Text>
			<Text style={styles.subtitle}>Default Expo Router navigation</Text>

			<View style={styles.buttons}>
				<Pressable style={styles.button} onPress={() => router.push("/detail")}>
					<Text style={styles.buttonText}>Push Detail Screen</Text>
					<Text style={styles.buttonHint}>Standard stack push</Text>
				</Pressable>

				<Pressable style={styles.button} onPress={() => router.push("/modal")}>
					<Text style={styles.buttonText}>Open Modal</Text>
					<Text style={styles.buttonHint}>presentation: "modal"</Text>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={() => router.push("/full-screen-modal")}
				>
					<Text style={styles.buttonText}>Open Full Screen Modal</Text>
					<Text style={styles.buttonHint}>presentation: "fullScreenModal"</Text>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={() => router.push("/form-sheet")}
				>
					<Text style={styles.buttonText}>Open Form Sheet</Text>
					<Text style={styles.buttonHint}>presentation: "formSheet"</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		paddingTop: 60,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 15,
		opacity: 0.5,
		marginBottom: 40,
	},
	buttons: {
		gap: 12,
	},
	button: {
		backgroundColor: "#1a1a1a",
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderRadius: 12,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	buttonHint: {
		color: "#888",
		fontSize: 13,
		marginTop: 2,
	},
});
