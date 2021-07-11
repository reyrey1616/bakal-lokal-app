import React from "react";
import { View, ScrollView } from "react-native";
import { theme } from "../../infra/theme";
import styled from "styled-components/native";
import { ProductCard } from "./product-card.component";
import { selectLoading } from "../../services/products/products.selectors";
import { useSelector } from "react-redux";

import { Spinner, Content } from "native-base";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

export const ProductsContainer = ({ products, navigation }) => {
	const loading = useSelector(selectLoading);
	return (
		<View style={{ flex: 1 }}>
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: theme.colors.brand.dirtywhite,
					flexDirection: "row",
					flexWrap: "wrap",
					padding: 10,
				}}
			>
				{loading ? (
					<Content>
						<Spinner color="orange" />
					</Content>
				) : (
					products?.map((prod) => (
						<ProductCard
							key={prod?.id}
							product={prod}
							navigation={navigation}
						/>
					))
				)}
			</ScrollViewContainer>
		</View>
	);
};
