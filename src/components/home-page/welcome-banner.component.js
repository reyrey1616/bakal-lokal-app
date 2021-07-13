import React from "react";
import { View } from "react-native";
import { theme } from "../../infra/theme";
import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";
const WelcomeBanner = () => {
	return (
		<View
			style={{
				backgroundColor: theme.colors.brand.orange,
				display: "flex",
				alignItems: "center",
				padding: 15,
			}}
		>
			<Text
				style={{
					color: "white",
					textAlign: "center",
					fontSize: theme.fontSizes.h5,
					fontWeight: "bold",
				}}
				variant="body"
			>
				Welcome to Bakal Lokal{" "}
			</Text>
			<Spacer position="bottom" size="medium" />
			<Text
				style={{
					color: "white",
					textAlign: "center",
					paddingRight: 50,
					paddingLeft: 50,
				}}
				variant="label"
			>
				Bringing Quality Local Products to the Comfort of your Home.
			</Text>
		</View>
	);
};

export default WelcomeBanner;
