import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Explore</Text>
			<Text style={styles.subtitle}>Second tab - default tab switch</Text>
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
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 15,
		opacity: 0.5,
	},
});
