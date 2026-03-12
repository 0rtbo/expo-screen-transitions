import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Detail Screen</Text>
			<Text style={styles.subtitle}>
				Pushed with the default iOS/Android stack animation.
			</Text>
			<Text style={styles.subtitle}>No custom transitions here.</Text>

			<Pressable style={styles.button} onPress={() => router.back()}>
				<Text style={styles.buttonText}>Go Back</Text>
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
		marginBottom: 4,
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
