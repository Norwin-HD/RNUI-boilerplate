
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";


interface FooterProps {
  onSave?: () => void;
}

const Footer = ({ onSave }: FooterProps) => {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={[
				styles.container,
				{ paddingBottom: insets.bottom + moderateScale(8) },
			]}
		>
			<TouchableOpacity
				style={styles.saveBtn}
				onPress={onSave}
				accessibilityRole="button"
				accessibilityLabel="Guardar cambios"
			>
				<Text style={styles.saveText}>Guardar cambios</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: moderateScale(20),
		paddingTop: moderateScale(8),
		backgroundColor: "#ffffff",
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: "#E5E7EB",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 8,
	},
		saveBtn: {
			flex: 1,
			backgroundColor: "#016EED",
			borderRadius: moderateScale(12),
			alignItems: "center",
			justifyContent: "center",
			height: moderateScale(48),
			minWidth: moderateScale(120),
		},
		saveText: {
			color: "#fff",
			fontFamily: "Montserrat_600SemiBold",
			fontSize: moderateScale(16),
			textAlign: "center",
		},
});

export default Footer;
