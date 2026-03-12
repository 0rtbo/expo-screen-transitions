import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FormSheetScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Form Sheet</Text>
			<Text style={styles.subtitle}>
				Smaller modal that doesn't cover the full screen.{"\n"}Swipe down to
				dismiss.
			</Text>

			<Pressable style={styles.button} onPress={() => router.back()}>
				<Text style={styles.buttonText}>Dismiss</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 15,
		opacity: 0.5,
		textAlign: "center",
		lineHeight: 22,
	},
	button: {
		marginTop: 30,
		backgroundColor: "#1a1a1a",
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 12,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
