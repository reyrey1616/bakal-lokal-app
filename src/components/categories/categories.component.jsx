import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
// import { Text } from "../typography/text.component";
import styled from "styled-components";
import { Spacer } from "../spacer/spacer.component";
import SectionTitle from "../utils/title.component";
import { useSelector } from "react-redux";
import { selectCategories } from "../../services/category/category.selectors";

const HorizontalScrollView = styled(ScrollView)`
	width: 100%;
`;

const CategoryItemContainer = styled(View)`
	border-radius: 8px;
	width: 120;
`;

const CategoryItemImageContainer = styled(Image)`
	border-radius: 8px;
`;

export const CategoriesList = () => {
	const categories = useSelector(selectCategories);

	return (
		<View style={{ padding: 15 }}>
			<SectionTitle text1="Product" text2="categories" />
			<Spacer position="bottom" size="large" />

			<HorizontalScrollView horizontal>
				{categories &&
					categories?.map((cat) => {
						return <CategoryItem category={cat} key={cat?._id} />;
					})}
			</HorizontalScrollView>
		</View>
	);
};

export const CategoryItem = ({ category }) => {
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
				source={{
					uri: `https://bakal-lokal.xyz/categories/${category?.image}`,
				}}
				style={{ width: 100, height: 100 }}
			/>
			<Spacer position="bottom" size="medium" />
			<Text style={{ flex: 1, flexWrap: "wrap" }}>{category?.name} </Text>
		</CategoryItemContainer>
	);
};
