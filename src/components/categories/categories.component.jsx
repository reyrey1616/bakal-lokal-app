import React from "react";
import { ScrollView, View, Image } from "react-native";
import { Text } from "../typography/text.component";
import styled from "styled-components";
import { Spacer } from "../spacer/spacer.component";
import SectionTitle from "../utils/title.component";

const HorizontalScrollView = styled(ScrollView)`
	width: 100%;
`;

const CategoryItemContainer = styled(View)`
	border-radius: 8px;
`;

const CategoryItemImageContainer = styled(Image)`
	border-radius: 8px;
`;

export const CategoryItem = () => {
	return (
		<CategoryItemContainer
			style={{
				paddingRight: 15,
				shadowColor: "#333",
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.5,
				shadowRadius: 1,
			}}
		>
			<CategoryItemImageContainer
				source={require("../../assets/design/background.png")}
				style={{ width: 100, height: 100 }}
			/>
			<Spacer position="bottom" size="medium" />
			<Text variant="label"> Shop</Text>
		</CategoryItemContainer>
	);
};

export const CategoriesList = () => {
	return (
		<View style={{ padding: 15 }}>
			<SectionTitle text1="Product" text2="categories" />
			<Spacer position="bottom" size="large" />

			<HorizontalScrollView horizontal>
				<CategoryItem />
				<CategoryItem />
				<CategoryItem />
				<CategoryItem />
				<CategoryItem />
				<CategoryItem />
				<CategoryItem />
			</HorizontalScrollView>
		</View>
	);
};
