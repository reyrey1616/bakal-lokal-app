import React, { useEffect } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import Carousel from "../components/carousel/carousel.component";
import { StackHeader } from "../components/utils/stack-header.component";
import { MerchantDetails } from "../components/merchants/merchant-details.component";
import { ProductsContainer } from "../components/products/products-container.component";
import styled from "styled-components/native";
import { getProductsByMerchantStart } from "../services/products/products.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPublicProducts } from "../services/products/products.selectors";

const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const ShopDetailsScreen = ({ navigation, route }) => {
	const { merchant, previousScreen } = route?.params;
	const dispatch = useDispatch();
	const products = useSelector(selectPublicProducts);

	useEffect(() => {
		dispatch(getProductsByMerchantStart(merchant?.id));
	}, [dispatch]);

	console.log(products);

	return (
		<SafeArea style={{ position: "relative" }}>
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
				}}
			>
				<StackHeader previousScreen={previousScreen} />
				<Carousel
					data={[
						`https://bakal-lokal.xyz/merchants/${merchant?.logo}`,
					]}
				/>
				<MerchantDetails
					merchant={{
						...merchant,
						numberOfProducts: products && products?.length,
					}}
					navigation={navigation}
				/>
				<ProductsContainer products={products && products} />
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default ShopDetailsScreen;
