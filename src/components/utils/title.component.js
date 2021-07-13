import React from "react";
import { Text } from "../typography/text.component";
import { colors } from "../../infra/theme/colors";
import { fontSizes } from "../../infra/theme/fonts";
export const SectionTitle = ({ text1, text2, variant = "title" }) => {
	return (
		<Text>
			<Text
				variant={variant}
				style={{
					color: colors.brand.orange,
					fontSize: 24,
					fontWeight: "bold",
				}}
			>
				{text1}
			</Text>
			<Text
				variant={variant}
				style={{
					color: colors.brand.black,
					fontSize: 24,
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
