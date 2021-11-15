import React, { useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { ProductTabs } from "../components/products/products-tabs.component";
import { useDispatch } from "react-redux";
import {
	getProductsStart,
	getNewArrivalProductsStart,
} from "../services/products/products.actions";
const ProductsScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			dispatch(getProductsStart());
			dispatch(getNewArrivalProductsStart());
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<SafeArea>
			<HeaderWithSearch
				openDrawer={() => {
					navigation.dispatch();
				}}
			/>

			<ProductTabs navigation={navigation} />
		</SafeArea>
	);
};

export default ProductsScreen;
