import React from "react";
import { Text } from "react-native";
import { colors } from "../../infra/theme/colors";
import { fontSizes } from "../../infra/theme/fonts";
export const SectionTitle = ({ text1, text2 }) => {
	return (
		<Text>
			<Text
				style={{
					color: colors.brand.orange,
					fontSize: fontSizes.h5,
					fontWeight: "bold",
				}}
			>
				{text1}
			</Text>
			<Text
				style={{
					color: colors.brand.black,
					fontSize: fontSizes.h5,
					fontWeight: "bold",
				}}
			>
				{" "}
				{text2}
			</Text>
		</Text>
	);
};

export default SectionTitle;
