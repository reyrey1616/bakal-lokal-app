import React from "react";
import { View } from "react-native";
import { colors } from "../../infra/theme/colors";
import { Title } from "native-base";
import { fontSizes } from "../../infra/theme/fonts";
export const PageHeader = ({ title }) => {
	return (
		<View
			style={{
				padding: 10,
				marginBottom: 5,
				marginTop: 5,
				backgroundColor: "white",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Title
				style={{
					color: colors.brand.orange,
					fontSize: fontSizes.title,
				}}
			>
				{title}
			</Title>
		</View>
	);
};
