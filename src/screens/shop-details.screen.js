import React from "react";
import { ScrollView } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import Carousel from "../components/carousel/carousel.component";
import { StackHeader } from "../components/utils/stack-header.component";
import { MerchantDetails } from "../components/merchants/merchant-details.component";
import { ProductsContainer } from "../components/products/products-container.component";
import { products } from "../components/products/products-tabs.component";
import styled from "styled-components/native";
import { theme } from "../infra/theme";
const images = [
	{
		id: 1,
		title: "Wow",
		image:
			"http://bakal-lokal.xyz/products/fish%20crackers-1620793789728-1624699196145.JPG",
	},
	{
		id: 2,
		title: "Wow",
		image:
			"http://bakal-lokal.xyz/products/fish%20crackers-1620793789728-1624699196145.JPG",
	},
];
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const ShopDetailsScreen = ({ navigation, route }) => {
	const { merchant, previousScreen } = route?.params;
	return (
		<SafeArea style={{ position: "relative" }}>
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
				}}
			>
				<StackHeader previousScreen={previousScreen} />
				<Carousel data={images} />
				<MerchantDetails merchant={merchant} navigation={navigation} />
				<ProductsContainer products={[...products, ...products]} />
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default ShopDetailsScreen;
